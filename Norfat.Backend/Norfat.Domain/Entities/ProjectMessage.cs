namespace Norfat.Domain.Entities;

public class ProjectMessage
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ProjectOrderId { get; set; }
    public ProjectOrder? ProjectOrder { get; set; }

    public Guid SenderId { get; set; }
    public string SenderName { get; set; } = string.Empty;
    public bool IsStaff { get; set; }
    public string MessageText { get; set; } = string.Empty;
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
}
