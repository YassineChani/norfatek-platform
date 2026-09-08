using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Norfat.Application.Interfaces;

namespace Norfat.Infrastructure.Services;

public class JwtProvider : IJwtProvider
{
    private readonly IConfiguration _configuration;

    public JwtProvider(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(Guid userId, string email, string role, string fullName)
    {
        var secret = _configuration["Jwt:Key"] ?? "NorfatManufacturing_SuperSecret_JwtKey_2026_PrecisionEngineering_998877!";
        var issuer = _configuration["Jwt:Issuer"] ?? "NorfatApi";
        var audience = _configuration["Jwt:Audience"] ?? "NorfatClientPortal";

        var header = new { alg = "HS256", typ = "JWT" };
        var headerBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(header));
        var headerBase64 = Base64UrlEncode(headerBytes);

        var exp = DateTimeOffset.UtcNow.AddDays(7).ToUnixTimeSeconds();
        var payload = new Dictionary<string, object>
        {
            { "sub", userId.ToString() },
            { "email", email },
            { "name", fullName },
            { "role", role },
            { "iss", issuer },
            { "aud", audience },
            { "exp", exp },
            { "jti", Guid.NewGuid().ToString() }
        };

        var payloadBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(payload));
        var payloadBase64 = Base64UrlEncode(payloadBytes);

        var stringToSign = $"{headerBase64}.{payloadBase64}";
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
        var signatureBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(stringToSign));
        var signatureBase64 = Base64UrlEncode(signatureBytes);

        return $"{stringToSign}.{signatureBase64}";
    }

    private static string Base64UrlEncode(byte[] input)
    {
        return Convert.ToBase64String(input)
            .TrimEnd('=')
            .Replace('+', '-')
            .Replace('/', '_');
    }
}

public class PasswordHasher
{
    public static string Hash(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(16);
        var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100_000, HashAlgorithmName.SHA256);
        byte[] hash = pbkdf2.GetBytes(32);

        byte[] hashBytes = new byte[48];
        Array.Copy(salt, 0, hashBytes, 0, 16);
        Array.Copy(hash, 0, hashBytes, 16, 32);

        return Convert.ToBase64String(hashBytes);
    }

    public static bool Verify(string password, string storedHash)
    {
        try
        {
            byte[] hashBytes = Convert.FromBase64String(storedHash);
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100_000, HashAlgorithmName.SHA256);
            byte[] hash = pbkdf2.GetBytes(32);

            for (int i = 0; i < 32; i++)
            {
                if (hashBytes[i + 16] != hash[i]) return false;
            }
            return true;
        }
        catch
        {
            return false;
        }
    }
}
