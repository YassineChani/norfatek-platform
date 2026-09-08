using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Norfat.Application.DTOs;
using Norfat.Application.Interfaces;

namespace Norfat.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly IProjectService _projectService;

    public AdminController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet("metrics")]
    public async Task<ActionResult<DashboardMetricsDto>> GetMetrics()
    {
        var metrics = await _projectService.GetMetricsAsync();
        return Ok(metrics);
    }

    [HttpGet("projects")]
    public async Task<ActionResult<List<ProjectOrderDto>>> GetAllProjects()
    {
        var all = await _projectService.GetAllProjectsAsync();
        return Ok(all);
    }

    [HttpPut("projects/{id:guid}/status")]
    public async Task<ActionResult<ProjectOrderDto>> UpdateStatus(Guid id, [FromBody] UpdateProjectStatusDto dto)
    {
        try
        {
            var updated = await _projectService.UpdateStatusAsync(id, dto);
            return Ok(updated);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPost("projects/{id:guid}/documents")]
    public async Task<ActionResult<ProjectFileDto>> UploadDocument(Guid id, [FromForm] IFormFile file, [FromForm] string? category)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { message = "Valid file must be provided." });
        }

        try
        {
            var uploaded = await _projectService.UploadAdminDocumentAsync(id, file, category ?? "Technical Document");
            return Ok(uploaded);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
