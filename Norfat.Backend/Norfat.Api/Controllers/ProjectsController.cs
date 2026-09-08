using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Norfat.Application.DTOs;
using Norfat.Application.Interfaces;

namespace Norfat.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProjectOrderDto>>> GetMyProjects()
    {
        var userId = GetUserId();
        var isAdmin = User.IsInRole("Admin");

        if (isAdmin)
        {
            var all = await _projectService.GetAllProjectsAsync();
            return Ok(all);
        }

        var list = await _projectService.GetClientProjectsAsync(userId);
        return Ok(list);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProjectOrderDto>> GetById(Guid id)
    {
        var userId = GetUserId();
        var isAdmin = User.IsInRole("Admin");

        try
        {
            var project = await _projectService.GetProjectByIdAsync(id, userId, isAdmin);
            if (project == null) return NotFound(new { message = "Project not found" });
            return Ok(project);
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    [HttpPost]
    public async Task<ActionResult<ProjectOrderDto>> CreateProject([FromForm] CreateProjectDto dto, [FromForm] List<IFormFile>? files)
    {
        var userId = GetUserId();
        var created = await _projectService.CreateProjectAsync(userId, dto, files);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPost("{id:guid}/messages")]
    public async Task<ActionResult<ProjectMessageDto>> AddMessage(Guid id, [FromBody] AddMessageDto dto)
    {
        var userId = GetUserId();
        var userName = User.FindFirstValue(ClaimTypes.Name) ?? "User";
        var isStaff = User.IsInRole("Admin");

        var msg = await _projectService.AddMessageAsync(id, userId, userName, isStaff, dto);
        return Ok(msg);
    }

    [HttpGet("files/{fileId:guid}/download")]
    public async Task<IActionResult> DownloadFile(Guid fileId)
    {
        var userId = GetUserId();
        var isAdmin = User.IsInRole("Admin");

        try
        {
            var (bytes, contentType, fileName) = await _projectService.DownloadFileAsync(fileId, userId, isAdmin);
            return File(bytes, contentType, fileName);
        }
        catch (FileNotFoundException)
        {
            return NotFound(new { message = "File physical storage not found." });
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    private Guid GetUserId()
    {
        var idStr = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        if (Guid.TryParse(idStr, out var id)) return id;
        throw new UnauthorizedAccessException("Missing or invalid user identity token.");
    }
}
