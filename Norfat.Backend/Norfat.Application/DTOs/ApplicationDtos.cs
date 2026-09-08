namespace Norfat.Application.DTOs;

public class RegisterDto
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
}

public class LoginDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class AuthResponseDto
{
    public Guid UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
}

public class CreateProjectDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Material { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public string Tolerances { get; set; } = string.Empty;
    public DateTime? TargetDeadline { get; set; }
}

public class UpdateProjectStatusDto
{
    public string Status { get; set; } = string.Empty;
    public decimal? QuotedPrice { get; set; }
}

public class AddMessageDto
{
    public string MessageText { get; set; } = string.Empty;
}

public class ProjectFileDto
{
    public Guid Id { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public long FileSizeBytes { get; set; }
    public bool IsClientUpload { get; set; }
    public string Category { get; set; } = string.Empty;
    public DateTime UploadedAt { get; set; }
    public string DownloadUrl { get; set; } = string.Empty;
}

public class ProjectMessageDto
{
    public Guid Id { get; set; }
    public Guid SenderId { get; set; }
    public string SenderName { get; set; } = string.Empty;
    public bool IsStaff { get; set; }
    public string MessageText { get; set; } = string.Empty;
    public DateTime SentAt { get; set; }
}

public class ProjectOrderDto
{
    public Guid Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Material { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public string Tolerances { get; set; } = string.Empty;
    public DateTime? TargetDeadline { get; set; }
    public decimal? QuotedPrice { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public Guid ClientId { get; set; }
    public string ClientName { get; set; } = string.Empty;
    public string ClientCompany { get; set; } = string.Empty;
    public string ClientEmail { get; set; } = string.Empty;
    public List<ProjectFileDto> Files { get; set; } = new();
    public List<ProjectMessageDto> Messages { get; set; } = new();
}

public class DashboardMetricsDto
{
    public int TotalProjects { get; set; }
    public int InReview { get; set; }
    public int InProduction { get; set; }
    public int Completed { get; set; }
    public decimal TotalValueQuoted { get; set; }
}
