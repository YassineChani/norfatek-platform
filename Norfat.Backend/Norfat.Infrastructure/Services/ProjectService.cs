using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Norfat.Application.DTOs;
using Norfat.Application.Interfaces;
using Norfat.Domain.Entities;
using Norfat.Domain.Enums;
using Norfat.Infrastructure.Data;

namespace Norfat.Infrastructure.Services;

public class ProjectService : IProjectService
{
    private readonly NorfatDbContext _db;
    private readonly IFileStorageService _storage;

    public ProjectService(NorfatDbContext db, IFileStorageService storage)
    {
        _db = db;
        _storage = storage;
    }

    public async Task<ProjectOrderDto> CreateProjectAsync(Guid clientId, CreateProjectDto dto, List<IFormFile>? files)
    {
        var client = await _db.Users.FindAsync(clientId);
        if (client == null) throw new KeyNotFoundException("Client not found.");

        var count = await _db.Projects.CountAsync();
        var orderNumber = $"NF-{DateTime.UtcNow.Year}-{(count + 1):D4}";

        var project = new ProjectOrder
        {
            OrderNumber = orderNumber,
            Title = dto.Title.Trim(),
            Description = dto.Description.Trim(),
            Material = dto.Material.Trim(),
            Quantity = dto.Quantity <= 0 ? 1 : dto.Quantity,
            Tolerances = string.IsNullOrWhiteSpace(dto.Tolerances) ? "Standard (+/- 0.005\")" : dto.Tolerances.Trim(),
            TargetDeadline = dto.TargetDeadline,
            Status = ProjectStatus.Received,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            ClientId = clientId
        };

        _db.Projects.Add(project);
        await _db.SaveChangesAsync();

        if (files != null && files.Count > 0)
        {
            foreach (var file in files)
            {
                if (file.Length == 0) continue;
                var storedPath = await _storage.SaveFileAsync(file, $"orders/{project.Id}");
                var orderFile = new OrderFile
                {
                    ProjectOrderId = project.Id,
                    FileName = file.FileName,
                    StoredFileName = storedPath,
                    ContentType = file.ContentType,
                    FileSizeBytes = file.Length,
                    IsClientUpload = true,
                    Category = DetermineCategory(file.FileName),
                    UploadedAt = DateTime.UtcNow
                };
                _db.OrderFiles.Add(orderFile);
            }
            await _db.SaveChangesAsync();
        }

        // Add initial system message
        var sysMsg = new ProjectMessage
        {
            ProjectOrderId = project.Id,
            SenderId = Guid.Empty,
            SenderName = "NORFAT Engineering System",
            IsStaff = true,
            MessageText = $"Project order {orderNumber} has been received and queued for engineering DFM review.",
            SentAt = DateTime.UtcNow
        };
        _db.ProjectMessages.Add(sysMsg);
        await _db.SaveChangesAsync();

        return (await GetProjectByIdAsync(project.Id, clientId, false))!;
    }

    public async Task<List<ProjectOrderDto>> GetClientProjectsAsync(Guid clientId)
    {
        var projects = await _db.Projects
            .Include(p => p.Client)
            .Include(p => p.Files)
            .Include(p => p.Messages)
            .Where(p => p.ClientId == clientId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return projects.Select(MapToDto).ToList();
    }

    public async Task<List<ProjectOrderDto>> GetAllProjectsAsync()
    {
        var projects = await _db.Projects
            .Include(p => p.Client)
            .Include(p => p.Files)
            .Include(p => p.Messages)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return projects.Select(MapToDto).ToList();
    }

    public async Task<ProjectOrderDto?> GetProjectByIdAsync(Guid projectId, Guid currentUserId, bool isAdmin)
    {
        var project = await _db.Projects
            .Include(p => p.Client)
            .Include(p => p.Files)
            .Include(p => p.Messages)
            .FirstOrDefaultAsync(p => p.Id == projectId);

        if (project == null) return null;
        if (!isAdmin && project.ClientId != currentUserId)
        {
            throw new UnauthorizedAccessException("You do not have access to this project.");
        }

        return MapToDto(project);
    }

    public async Task<ProjectOrderDto> UpdateStatusAsync(Guid projectId, UpdateProjectStatusDto dto)
    {
        var project = await _db.Projects
            .Include(p => p.Client)
            .Include(p => p.Files)
            .Include(p => p.Messages)
            .FirstOrDefaultAsync(p => p.Id == projectId);

        if (project == null) throw new KeyNotFoundException("Project not found.");

        if (Enum.TryParse<ProjectStatus>(dto.Status, true, out var parsedStatus))
        {
            project.Status = parsedStatus;
        }

        if (dto.QuotedPrice.HasValue)
        {
            project.QuotedPrice = dto.QuotedPrice.Value;
        }

        project.UpdatedAt = DateTime.UtcNow;

        // Auto notification message
        var msg = new ProjectMessage
        {
            ProjectOrderId = project.Id,
            SenderId = Guid.Empty,
            SenderName = "NORFAT Operations Team",
            IsStaff = true,
            MessageText = $"Project status updated to: {project.Status}.{(dto.QuotedPrice.HasValue ? $" Quoted Price: ${dto.QuotedPrice:F2}" : "")}",
            SentAt = DateTime.UtcNow
        };
        _db.ProjectMessages.Add(msg);

        await _db.SaveChangesAsync();
        return MapToDto(project);
    }

    public async Task<ProjectMessageDto> AddMessageAsync(Guid projectId, Guid senderId, string senderName, bool isStaff, AddMessageDto dto)
    {
        var project = await _db.Projects.FindAsync(projectId);
        if (project == null) throw new KeyNotFoundException("Project not found.");

        var msg = new ProjectMessage
        {
            ProjectOrderId = projectId,
            SenderId = senderId,
            SenderName = senderName,
            IsStaff = isStaff,
            MessageText = dto.MessageText.Trim(),
            SentAt = DateTime.UtcNow
        };

        _db.ProjectMessages.Add(msg);
        project.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return new ProjectMessageDto
        {
            Id = msg.Id,
            SenderId = msg.SenderId,
            SenderName = msg.SenderName,
            IsStaff = msg.IsStaff,
            MessageText = msg.MessageText,
            SentAt = msg.SentAt
        };
    }

    public async Task<ProjectFileDto> UploadAdminDocumentAsync(Guid projectId, IFormFile file, string category)
    {
        var project = await _db.Projects.FindAsync(projectId);
        if (project == null) throw new KeyNotFoundException("Project not found.");

        var storedPath = await _storage.SaveFileAsync(file, $"orders/{projectId}/deliverables");
        var orderFile = new OrderFile
        {
            ProjectOrderId = projectId,
            FileName = file.FileName,
            StoredFileName = storedPath,
            ContentType = file.ContentType,
            FileSizeBytes = file.Length,
            IsClientUpload = false,
            Category = string.IsNullOrWhiteSpace(category) ? "Technical Report" : category.Trim(),
            UploadedAt = DateTime.UtcNow
        };

        _db.OrderFiles.Add(orderFile);
        project.UpdatedAt = DateTime.UtcNow;

        var msg = new ProjectMessage
        {
            ProjectOrderId = projectId,
            SenderId = Guid.Empty,
            SenderName = "NORFAT Engineering System",
            IsStaff = true,
            MessageText = $"New staff document uploaded: {orderFile.FileName} ({orderFile.Category})",
            SentAt = DateTime.UtcNow
        };
        _db.ProjectMessages.Add(msg);

        await _db.SaveChangesAsync();

        return new ProjectFileDto
        {
            Id = orderFile.Id,
            FileName = orderFile.FileName,
            ContentType = orderFile.ContentType,
            FileSizeBytes = orderFile.FileSizeBytes,
            IsClientUpload = false,
            Category = orderFile.Category,
            UploadedAt = orderFile.UploadedAt,
            DownloadUrl = $"/api/v1/projects/files/{orderFile.Id}/download"
        };
    }

    public async Task<(byte[] Bytes, string ContentType, string FileName)> DownloadFileAsync(Guid fileId, Guid currentUserId, bool isAdmin)
    {
        var file = await _db.OrderFiles.Include(f => f.ProjectOrder).FirstOrDefaultAsync(f => f.Id == fileId);
        if (file == null) throw new KeyNotFoundException("File record not found.");

        if (!isAdmin && file.ProjectOrder?.ClientId != currentUserId)
        {
            throw new UnauthorizedAccessException("Unauthorized file access.");
        }

        var bytes = await _storage.ReadFileAsync(file.StoredFileName);
        return (bytes, file.ContentType, file.FileName);
    }

    public async Task<DashboardMetricsDto> GetMetricsAsync()
    {
        var total = await _db.Projects.CountAsync();
        var inReview = await _db.Projects.CountAsync(p => p.Status == ProjectStatus.InReview || p.Status == ProjectStatus.Received);
        var inProduction = await _db.Projects.CountAsync(p => p.Status == ProjectStatus.InProduction || p.Status == ProjectStatus.QualityCheck);
        var completed = await _db.Projects.CountAsync(p => p.Status == ProjectStatus.Completed || p.Status == ProjectStatus.Shipped);
        var totalVal = await _db.Projects.Where(p => p.QuotedPrice.HasValue).SumAsync(p => p.QuotedPrice!.Value);

        return new DashboardMetricsDto
        {
            TotalProjects = total,
            InReview = inReview,
            InProduction = inProduction,
            Completed = completed,
            TotalValueQuoted = totalVal
        };
    }

    private static string DetermineCategory(string fileName)
    {
        var ext = Path.GetExtension(fileName).ToLowerInvariant();
        return ext switch
        {
            ".step" or ".stp" or ".iges" or ".igs" or ".sldprt" or ".ipt" => "3D CAD Model",
            ".dxf" or ".dwg" => "2D Technical Drawing",
            ".pdf" => "Engineering Spec / PDF",
            _ => "Technical Attachment"
        };
    }

    private static ProjectOrderDto MapToDto(ProjectOrder p)
    {
        return new ProjectOrderDto
        {
            Id = p.Id,
            OrderNumber = p.OrderNumber,
            Title = p.Title,
            Description = p.Description,
            Material = p.Material,
            Quantity = p.Quantity,
            Tolerances = p.Tolerances,
            TargetDeadline = p.TargetDeadline,
            QuotedPrice = p.QuotedPrice,
            Status = p.Status.ToString(),
            CreatedAt = p.CreatedAt,
            UpdatedAt = p.UpdatedAt,
            ClientId = p.ClientId,
            ClientName = p.Client?.FullName ?? "Client",
            ClientCompany = p.Client?.CompanyName ?? "",
            ClientEmail = p.Client?.Email ?? "",
            Files = p.Files.Select(f => new ProjectFileDto
            {
                Id = f.Id,
                FileName = f.FileName,
                ContentType = f.ContentType,
                FileSizeBytes = f.FileSizeBytes,
                IsClientUpload = f.IsClientUpload,
                Category = f.Category,
                UploadedAt = f.UploadedAt,
                DownloadUrl = $"/api/v1/projects/files/{f.Id}/download"
            }).OrderByDescending(f => f.UploadedAt).ToList(),
            Messages = p.Messages.Select(m => new ProjectMessageDto
            {
                Id = m.Id,
                SenderId = m.SenderId,
                SenderName = m.SenderName,
                IsStaff = m.IsStaff,
                MessageText = m.MessageText,
                SentAt = m.SentAt
            }).OrderBy(m => m.SentAt).ToList()
        };
    }
}
