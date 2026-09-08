using Microsoft.EntityFrameworkCore;
using Norfat.Application.DTOs;
using Norfat.Application.Interfaces;
using Norfat.Domain.Entities;
using Norfat.Domain.Enums;
using Norfat.Infrastructure.Data;

namespace Norfat.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly NorfatDbContext _db;
    private readonly IJwtProvider _jwtProvider;

    public AuthService(NorfatDbContext db, IJwtProvider jwtProvider)
    {
        _db = db;
        _jwtProvider = jwtProvider;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
    {
        var existing = await _db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower());
        if (existing != null)
        {
            throw new InvalidOperationException("An account with this email address already exists.");
        }

        var user = new User
        {
            FullName = dto.FullName.Trim(),
            Email = dto.Email.Trim().ToLower(),
            PasswordHash = PasswordHasher.Hash(dto.Password),
            CompanyName = dto.CompanyName.Trim(),
            PhoneNumber = dto.PhoneNumber.Trim(),
            Role = UserRole.Client,
            CreatedAt = DateTime.UtcNow
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        var token = _jwtProvider.GenerateToken(user.Id, user.Email, user.Role.ToString(), user.FullName);
        return new AuthResponseDto
        {
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            CompanyName = user.CompanyName,
            Role = user.Role.ToString(),
            Token = token
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower());
        if (user == null || !PasswordHasher.Verify(dto.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        var token = _jwtProvider.GenerateToken(user.Id, user.Email, user.Role.ToString(), user.FullName);
        return new AuthResponseDto
        {
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            CompanyName = user.CompanyName,
            Role = user.Role.ToString(),
            Token = token
        };
    }
}
