using System.Text;
using Microsoft.EntityFrameworkCore;


using Norfat.Application.Interfaces;
using Norfat.Infrastructure.Data;
using Norfat.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Database connection
// Database connection with SQLite provider
builder.Services.AddDbContext<NorfatDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=norfat.db"));

// Register Application & Infrastructure services
builder.Services.AddScoped<IJwtProvider, JwtProvider>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddSingleton<IFileStorageService, LocalFileStorageService>();

// Authentication using Custom JWT
builder.Services.AddAuthentication("CustomJwt")
    .AddScheme<Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions, CustomJwtAuthHandler>("CustomJwt", null);

builder.Services.AddAuthorization();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "http://127.0.0.1:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();
var app = builder.Build();

// Auto-seed database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<NorfatDbContext>();
    await DbInitializer.SeedAsync(db);
}

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

public class CustomJwtAuthHandler : Microsoft.AspNetCore.Authentication.AuthenticationHandler<Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions>
{
    private readonly IConfiguration _config;

    public CustomJwtAuthHandler(
        Microsoft.Extensions.Options.IOptionsMonitor<Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        System.Text.Encodings.Web.UrlEncoder encoder,
        IConfiguration config)
        : base(options, logger, encoder)
    {
        _config = config;
    }

    protected override Task<Microsoft.AspNetCore.Authentication.AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.TryGetValue("Authorization", out var authHeaderValues))
        {
            return Task.FromResult(Microsoft.AspNetCore.Authentication.AuthenticateResult.NoResult());
        }

        var authHeader = authHeaderValues.ToString();
        if (!authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
        {
            return Task.FromResult(Microsoft.AspNetCore.Authentication.AuthenticateResult.NoResult());
        }

        var token = authHeader["Bearer ".Length..].Trim();
        var parts = token.Split('.');
        if (parts.Length != 3)
        {
            return Task.FromResult(Microsoft.AspNetCore.Authentication.AuthenticateResult.Fail("Malformed JWT token."));
        }

        var secret = _config["Jwt:Key"] ?? "NorfatManufacturing_SuperSecret_JwtKey_2026_PrecisionEngineering_998877!";
        var stringToSign = $"{parts[0]}.{parts[1]}";
        using var hmac = new System.Security.Cryptography.HMACSHA256(Encoding.UTF8.GetBytes(secret));
        var signatureBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(stringToSign));
        var expectedSig = Convert.ToBase64String(signatureBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');

        if (expectedSig != parts[2])
        {
            return Task.FromResult(Microsoft.AspNetCore.Authentication.AuthenticateResult.Fail("Invalid JWT signature."));
        }

        try
        {
            var payloadJson = Encoding.UTF8.GetString(Base64UrlDecode(parts[1]));
            using var doc = System.Text.Json.JsonDocument.Parse(payloadJson);
            var root = doc.RootElement;

            if (root.TryGetProperty("exp", out var expProp))
            {
                var exp = expProp.GetInt64();
                if (DateTimeOffset.UtcNow.ToUnixTimeSeconds() > exp)
                {
                    return Task.FromResult(Microsoft.AspNetCore.Authentication.AuthenticateResult.Fail("Token expired."));
                }
            }

            var claims = new List<System.Security.Claims.Claim>();
            if (root.TryGetProperty("sub", out var subProp))
                claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.NameIdentifier, subProp.GetString()!));
            if (root.TryGetProperty("email", out var emailProp))
                claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Email, emailProp.GetString()!));
            if (root.TryGetProperty("name", out var nameProp))
                claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, nameProp.GetString()!));
            if (root.TryGetProperty("role", out var roleProp))
                claims.Add(new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, roleProp.GetString()!));

            var identity = new System.Security.Claims.ClaimsIdentity(claims, "CustomJwt");
            var principal = new System.Security.Claims.ClaimsPrincipal(identity);
            var ticket = new Microsoft.AspNetCore.Authentication.AuthenticationTicket(principal, "CustomJwt");

            return Task.FromResult(Microsoft.AspNetCore.Authentication.AuthenticateResult.Success(ticket));
        }
        catch (Exception ex)
        {
            return Task.FromResult(Microsoft.AspNetCore.Authentication.AuthenticateResult.Fail(ex));
        }
    }

    private static byte[] Base64UrlDecode(string input)
    {
        string base64 = input.Replace('-', '+').Replace('_', '/');
        switch (base64.Length % 4)
        {
            case 2: base64 += "=="; break;
            case 3: base64 += "="; break;
        }
        return Convert.FromBase64String(base64);
    }
}
