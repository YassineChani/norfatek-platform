namespace Norfat.Domain.Entities;

public class OrderFile
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ProjectOrderId { get; set; }
    public ProjectOrder? ProjectOrder { get; set; }

    public string FileName { get; set; } = string.Empty;
    public string StoredFileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public long FileSizeBytes { get; set; }
    public bool IsClientUpload { get; set; } = true; // true = client cad/drawing, false = norfat quote/report/invoice
    public string Category { get; set; } = "CAD/Drawing"; // CAD, Drawing, Quote, Invoice, Inspection Report
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
}
