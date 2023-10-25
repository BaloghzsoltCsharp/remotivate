using backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.ProjectServiceLayer;

public interface IProjectService
{
    Task<List<Project>> GetAllProjects();

    Task<List<TaskItem>> GetTasksByProjectID(long id);

    Task<Project> GetProjectById(long id);

    Task<Project> CreateProject(Project project);

    Task UpdateProject(Project project, long id);

    Task DeleteProject(long id);

    Task<List<User>> GetUsersByProjectID(long id);

    Task<List<User>> AddUserToProject(long id, long userid);

    Task<User> DeleteUserFromProject(long id, long userid);

}