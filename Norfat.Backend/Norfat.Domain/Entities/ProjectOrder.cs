using Norfat.Domain.Enums;

namespace Norfat.Domain.Entities;

public class ProjectOrder
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string OrderNumber { get; set; } = string.Empty; // e.g. NF-2026-001
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Material { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public string Tolerances { get; set; } = string.Empty;
    public DateTime? TargetDeadline { get; set; }
    public decimal? QuotedPrice { get; set; }
    public ProjectStatus Status { get; set; } = ProjectStatus.Received;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Guid ClientId { get; set; }
    public User? Client { get; set; }

    public ICollection<OrderFile> Files { get; set; } = new List<OrderFile>();
    public ICollection<ProjectMessage> Messages { get; set; } = new List<ProjectMessage>();
}
