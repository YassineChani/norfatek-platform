using Microsoft.EntityFrameworkCore;
using Norfat.Domain.Entities;
using Norfat.Domain.Enums;

namespace Norfat.Infrastructure.Data;

public class NorfatDbContext : DbContext
{
    public NorfatDbContext(DbContextOptions<NorfatDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<ProjectOrder> Projects => Set<ProjectOrder>();
    public DbSet<OrderFile> OrderFiles => Set<OrderFile>();
    public DbSet<ProjectMessage> ProjectMessages => Set<ProjectMessage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.HasIndex(u => u.Email).IsUnique();
            entity.Property(u => u.FullName).HasMaxLength(150).IsRequired();
            entity.Property(u => u.Email).HasMaxLength(150).IsRequired();
            entity.Property(u => u.CompanyName).HasMaxLength(150);
            entity.Property(u => u.PhoneNumber).HasMaxLength(50);
        });

        modelBuilder.Entity<ProjectOrder>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.OrderNumber).HasMaxLength(50).IsRequired();
            entity.Property(p => p.Title).HasMaxLength(200).IsRequired();
            entity.Property(p => p.Material).HasMaxLength(100);
            entity.Property(p => p.Tolerances).HasMaxLength(100);
            entity.Property(p => p.QuotedPrice).HasPrecision(18, 2);

            entity.HasOne(p => p.Client)
                  .WithMany(u => u.Projects)
                  .HasForeignKey(p => p.ClientId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<OrderFile>(entity =>
        {
            entity.HasKey(f => f.Id);
            entity.Property(f => f.FileName).HasMaxLength(255).IsRequired();
            entity.Property(f => f.StoredFileName).HasMaxLength(255).IsRequired();
            entity.Property(f => f.Category).HasMaxLength(100);

            entity.HasOne(f => f.ProjectOrder)
                  .WithMany(p => p.Files)
                  .HasForeignKey(f => f.ProjectOrderId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ProjectMessage>(entity =>
        {
            entity.HasKey(m => m.Id);
            entity.Property(m => m.SenderName).HasMaxLength(150).IsRequired();
            entity.Property(m => m.MessageText).IsRequired();

            entity.HasOne(m => m.ProjectOrder)
                  .WithMany(p => p.Messages)
                  .HasForeignKey(m => m.ProjectOrderId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
