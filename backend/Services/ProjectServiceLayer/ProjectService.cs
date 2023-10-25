using backend.Data;
using backend.Models.Entities;
using backend.Services.DateServiceLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.ProjectServiceLayer;

public class ProjectService : IProjectService
{
    private readonly RemotivateContext _context;
    private readonly DateService _dateService;
    public ProjectService(RemotivateContext context)
    {
        _context = context;
        _dateService = new DateService(_context);
    }

    public async Task<List<Project>> GetAllProjects()
    {
        return await _context.Projects
            .Include(p => p.UsersOnProject)
            .ToListAsync();
    }

    public async Task<Project> GetProjectById(long id)
    {
        return await _context.Projects
            .Where(p => p.Id == id)
            .FirstAsync();
    }

   public async Task<List<TaskItem>> GetTasksByProjectID(long id)
    {
        Project projectList= await _context.Projects
            .Include(p => p.Tasks)
            .FirstAsync(p => p.Id == id);
        List<TaskItem> tasks = new List<TaskItem>();
        if(projectList.Tasks != null)
        foreach (var task in projectList.Tasks)
        {
            tasks.Add(task);
        }
        return tasks;
    }
    public async Task<Project> CreateProject(Project project)
    {
        //project.DateId = await _dateService.CreateDate(project.Id, DeadLine, true);
      
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return await _context.Projects
            .Where(p => p.Id == project.Id)
            .FirstOrDefaultAsync() ?? throw new InvalidOperationException();
    }

    public async Task UpdateProject(Project project, long id)
    {
        var updatedProject = await _context.Projects
            .Where(p => p.Id == id)
            .FirstAsync();

        _context.Entry(updatedProject).CurrentValues.SetValues(project);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteProject(long id)
    {
        Project removedProject = await GetProjectById(id);
        _context.Projects.Remove(removedProject);
        await _context.SaveChangesAsync();
    }

    public async Task AddUserToProject(long id, User user)
    {
        var projectToAddUser = await _context.Projects.FirstOrDefaultAsync(t => t.Id == id);

        if (_context.Users.Any(i => i.Id == user.Id))
        {
            if (projectToAddUser != null)
            {
                projectToAddUser.UsersOnProject.Add(user);
                await _context.SaveChangesAsync();
            }
        }
    }

    public async Task<List<User>> GetUsersByProjectID(long id)
    {
        var project = await _context.Projects.Include(t => t.UsersOnProject).FirstOrDefaultAsync(t => t.Id == id);

        return project.UsersOnProject;
    }

    public async Task<List<User>> AddUserToProject(long id, long userid)
    {
        var projectToAddUser = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id);
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userid);
        projectToAddUser.UsersOnProject?.Add(user);

        await _context.SaveChangesAsync();

        return await _context.Users.Where(u => u.Id == userid).Include(u => u.Tasks).ToListAsync();
    }

    public async Task<User> DeleteUserFromProject(long id, long userid)
    {
        var projectToAddUser = await _context.Projects.Include(t => t.UsersOnProject).FirstOrDefaultAsync(p => p.Id == id);
        var userToRemove = await _context.Users.FirstOrDefaultAsync(p => p.Id == userid);

        if (projectToAddUser != null && userToRemove != null)
        {
            projectToAddUser.UsersOnProject?.Remove(userToRemove);
            await _context.SaveChangesAsync();
        }

        return userToRemove;
    }
}