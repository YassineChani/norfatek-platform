using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Norfat.Application.Interfaces;

namespace Norfat.Infrastructure.Services;

public class LocalFileStorageService : IFileStorageService
{
    private readonly string _storageRoot;

    public LocalFileStorageService(IHostEnvironment env)
    {
        _storageRoot = Path.Combine(env.ContentRootPath, "UploadedFiles");
        if (!Directory.Exists(_storageRoot))
        {
            Directory.CreateDirectory(_storageRoot);
        }
    }

    public async Task<string> SaveFileAsync(IFormFile file, string folder)
    {
        var targetDir = Path.Combine(_storageRoot, folder);
        if (!Directory.Exists(targetDir))
        {
            Directory.CreateDirectory(targetDir);
        }

        var ext = Path.GetExtension(file.FileName);
        var uniqueFileName = $"{Guid.NewGuid()}{ext}";
        var fullPath = Path.Combine(targetDir, uniqueFileName);

        using (var stream = new FileStream(fullPath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return Path.Combine(folder, uniqueFileName).Replace('\\', '/');
    }

    public async Task<byte[]> ReadFileAsync(string relativePath)
    {
        var fullPath = Path.Combine(_storageRoot, relativePath.Replace('/', Path.DirectorySeparatorChar));
        if (!File.Exists(fullPath))
        {
            throw new FileNotFoundException("Requested technical file was not found on server.");
        }
        return await File.ReadAllBytesAsync(fullPath);
    }

    public void DeleteFile(string relativePath)
    {
        var fullPath = Path.Combine(_storageRoot, relativePath.Replace('/', Path.DirectorySeparatorChar));
        if (File.Exists(fullPath))
        {
            File.Delete(fullPath);
        }
    }
}
