using Norfat.Domain.Enums;

namespace Norfat.Domain.Entities;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Client;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<ProjectOrder> Projects { get; set; } = new List<ProjectOrder>();
}
