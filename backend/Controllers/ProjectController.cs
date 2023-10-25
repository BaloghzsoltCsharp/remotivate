using backend.DTO;
using backend.Models.Entities;
using backend.Services.ProjectServiceLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController, Route("/projects")]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectController(IProjectService projectService)
    {
        _projectService = projectService;
    }
    
    [HttpGet]
    public async Task<List<Project>> GetAllProjects()
    {
        return await _projectService.GetAllProjects();
    }

    [Authorize(Roles = "Admin, ProjectManager")]
    [HttpPost]
    public async Task CreateProject([FromBody] CreateProjectDTO projectDTO)
    {
        Project project = new Project();
        project.Name = projectDTO.ProjectName;
        project.ManagerId = projectDTO.ManagerId;
        project.ProjectStatus= projectDTO.ProjectStatus;
        project.Description = projectDTO.Description;

        await _projectService.CreateProject(project);
    }

    [HttpGet("{id}")]
    public async Task<Project> GetProjectByID(long id)
    {
        return await _projectService.GetProjectById(id);
    }
    [HttpGet("tasks/{id}")]
    public async Task<List<TaskItem>> GetTasksByProjectID(long id)
    {
        return await _projectService.GetTasksByProjectID(id);
    }
    [HttpGet("{id}/users")]
    public async Task<List<User>> GetUsersByProjectID(long id)
    {
        return await _projectService.GetUsersByProjectID(id);
    }

    [HttpPut("{id}")]
    public async Task UpdateProject([FromBody] Project project, long id)
    {
       await _projectService.UpdateProject(project, id);
    }
    [HttpPut("{id}/users")]
    public async Task<List<User>> AddUserToProject(long id,[FromBody] long userid)
    {
        return await _projectService.AddUserToProject(id, userid);
    }

    [HttpDelete("{id}")]
    public async Task DeleteProject(long id)
    {
        await _projectService.DeleteProject(id);
    }
    [HttpDelete("user/{id}")]
    public async Task<User> DeleteUserFromProject(long id, [FromBody] long userid)
    {
        return await _projectService.DeleteUserFromProject(id, userid);
    }

}