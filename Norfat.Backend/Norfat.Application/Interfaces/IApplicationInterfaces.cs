using Microsoft.AspNetCore.Http;
using Norfat.Application.DTOs;

namespace Norfat.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto> LoginAsync(LoginDto dto);
}

public interface IProjectService
{
    Task<ProjectOrderDto> CreateProjectAsync(Guid clientId, CreateProjectDto dto, List<IFormFile>? files);
    Task<List<ProjectOrderDto>> GetClientProjectsAsync(Guid clientId);
    Task<List<ProjectOrderDto>> GetAllProjectsAsync();
    Task<ProjectOrderDto?> GetProjectByIdAsync(Guid projectId, Guid currentUserId, bool isAdmin);
    Task<ProjectOrderDto> UpdateStatusAsync(Guid projectId, UpdateProjectStatusDto dto);
    Task<ProjectMessageDto> AddMessageAsync(Guid projectId, Guid senderId, string senderName, bool isStaff, AddMessageDto dto);
    Task<ProjectFileDto> UploadAdminDocumentAsync(Guid projectId, IFormFile file, string category);
    Task<(byte[] Bytes, string ContentType, string FileName)> DownloadFileAsync(Guid fileId, Guid currentUserId, bool isAdmin);
    Task<DashboardMetricsDto> GetMetricsAsync();
}

public interface IFileStorageService
{
    Task<string> SaveFileAsync(IFormFile file, string folder);
    Task<byte[]> ReadFileAsync(string relativePath);
    void DeleteFile(string relativePath);
}

public interface IJwtProvider
{
    string GenerateToken(Guid userId, string email, string role, string fullName);
}
