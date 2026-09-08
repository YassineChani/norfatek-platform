using Norfat.Domain.Entities;
using Norfat.Domain.Enums;
using Norfat.Infrastructure.Data;

namespace Norfat.Infrastructure.Services;

public static class DbInitializer
{
    public static async Task SeedAsync(NorfatDbContext db)
    {
        await db.Database.EnsureCreatedAsync();

        if (!db.Users.Any())
        {
            var admin = new User
            {
                Id = Guid.NewGuid(),
                FullName = "Marcus Vance (Chief Engineer)",
                Email = "admin@norfatmfg.com",
                PasswordHash = PasswordHasher.Hash("Admin@Norfat2026!"),
                CompanyName = "NORFAT Manufacturing & Supply",
                PhoneNumber = "+1 (330) 555-0199",
                Role = UserRole.Admin,
                CreatedAt = DateTime.UtcNow
            };

            var client = new User
            {
                Id = Guid.NewGuid(),
                FullName = "Sarah Jenkins",
                Email = "client@apexrobotics.com",
                PasswordHash = PasswordHasher.Hash("Client@Norfat2026!"),
                CompanyName = "Apex Robotics Systems LLC",
                PhoneNumber = "+1 (614) 555-4821",
                Role = UserRole.Client,
                CreatedAt = DateTime.UtcNow
            };

            db.Users.AddRange(admin, client);
            await db.SaveChangesAsync();

            // Seed sample active projects
            var proj1 = new ProjectOrder
            {
                Id = Guid.NewGuid(),
                OrderNumber = "NF-2026-0104",
                Title = "High-Torque Planetary Gear Housing & Pinion Set",
                Description = "Custom aerospace-grade housing milled from 7075-T6 aluminum with precision bearing bores. Surface finish Ra 0.8 µm.",
                Material = "Aluminum 7075-T6 (Mil-Spec)",
                Quantity = 50,
                Tolerances = "+/- 0.0002\" (5 µm)",
                TargetDeadline = DateTime.UtcNow.AddDays(14),
                QuotedPrice = 6850.00m,
                Status = ProjectStatus.InProduction,
                CreatedAt = DateTime.UtcNow.AddDays(-5),
                UpdatedAt = DateTime.UtcNow.AddHours(-3),
                ClientId = client.Id
            };

            var proj2 = new ProjectOrder
            {
                Id = Guid.NewGuid(),
                OrderNumber = "NF-2026-0108",
                Title = "Medical Fluid Manifold Core - Swiss Turned & Micro-Milled",
                Description = "Titanium Grade 5 micro-machined fluid passages for endoscopic surgical apparatus. Zero burr requirement at 20x magnification.",
                Material = "Titanium Ti-6Al-4V ELI (Grade 23)",
                Quantity = 200,
                Tolerances = "+/- 0.0001\" (2.5 µm)",
                TargetDeadline = DateTime.UtcNow.AddDays(21),
                QuotedPrice = 14200.00m,
                Status = ProjectStatus.QualityCheck,
                CreatedAt = DateTime.UtcNow.AddDays(-9),
                UpdatedAt = DateTime.UtcNow.AddHours(-1),
                ClientId = client.Id
            };

            var proj3 = new ProjectOrder
            {
                Id = Guid.NewGuid(),
                OrderNumber = "NF-2026-0115",
                Title = "Robotic Actuator Arm Spline Flange",
                Description = "316L Stainless Steel flange with internal wire EDM spline. High corrosion resistance required for subsea robotics arm.",
                Material = "Stainless Steel 316L",
                Quantity = 12,
                Tolerances = "+/- 0.0005\"",
                TargetDeadline = DateTime.UtcNow.AddDays(10),
                QuotedPrice = null,
                Status = ProjectStatus.InReview,
                CreatedAt = DateTime.UtcNow.AddHours(-6),
                UpdatedAt = DateTime.UtcNow.AddHours(-6),
                ClientId = client.Id
            };

            db.Projects.AddRange(proj1, proj2, proj3);

            // Add sample messages
            db.ProjectMessages.AddRange(
                new ProjectMessage
                {
                    ProjectOrderId = proj1.Id,
                    SenderId = client.Id,
                    SenderName = client.FullName,
                    IsStaff = false,
                    MessageText = "Please confirm if clear hardcoat anodize Type III Class 1 is included in this run.",
                    SentAt = DateTime.UtcNow.AddDays(-3)
                },
                new ProjectMessage
                {
                    ProjectOrderId = proj1.Id,
                    SenderId = admin.Id,
                    SenderName = admin.FullName,
                    IsStaff = true,
                    MessageText = "Confirmed Sarah. Type III hardcoat anodize with 50µm coating thickness is specified on routing traveler.",
                    SentAt = DateTime.UtcNow.AddDays(-2)
                },
                new ProjectMessage
                {
                    ProjectOrderId = proj2.Id,
                    SenderId = admin.Id,
                    SenderName = admin.FullName,
                    IsStaff = true,
                    MessageText = "Initial batch passed Zeiss CMM volumetric inspection with 100% feature tolerance conformance.",
                    SentAt = DateTime.UtcNow.AddHours(-2)
                }
            );

            await db.SaveChangesAsync();
        }
    }
}
