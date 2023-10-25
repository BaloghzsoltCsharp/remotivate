using backend.Data;
using backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.TaskServiceLayer;

public class TaskService : ITaskService
{
    private readonly RemotivateContext _context;

    public TaskService(RemotivateContext context)
    {
        _context = context;
    }

    public async Task<List<TaskItem>> GetAllTasks()
    {
        return await _context.Tasks.Include(t => t.UsersOnTask).ToListAsync();
    }

    public async Task<TaskItem?> GetTaskById(long id)
    {
        return await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
    }
    public async Task<List<User>> GetUsersByTaskId(long id)
    {
        var task = await _context.Tasks.Include(t => t.UsersOnTask).FirstOrDefaultAsync(t => t.Id == id);

        return task.UsersOnTask;
    }

    public async Task<List<TaskItem>> GetTasksByUserId(long userId)
    {
        return await _context.Tasks.Where(t => t.UsersOnTask.Any(u => u.Id == userId)).ToListAsync();
    }
    
    public async Task<List<User>> AddUserToTask(long id, long userId)
    {
        
        var taskToAddUser=await _context.Tasks.FirstOrDefaultAsync(p=> p.Id == id);
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        
        taskToAddUser.UsersOnTask?.Add(user);
        
        await _context.SaveChangesAsync();
        
        return await _context.Users.Where(u => u.Id == userId).Include(u => u.Tasks).ToListAsync();
    }

    public async Task<User> RemoveUserFromTask(long id, long userid)
    {
        var taskToAddUser = await _context.Tasks.Include(t=>t.UsersOnTask).FirstOrDefaultAsync(p=> p.Id == id);
        var userToRemove =  await _context.Users.FirstOrDefaultAsync(p=> p.Id == userid);
        
        if(taskToAddUser != null && userToRemove != null)
        {
            taskToAddUser.UsersOnTask?.Remove(userToRemove);
            await _context.SaveChangesAsync();
        }

        return userToRemove;
    }

    public async Task<TaskItem> CreateTask(long projectId, TaskItem task)
    {
       var projectToAddTask = await _context.Projects.FirstOrDefaultAsync(p => p.Id == projectId);
       
       if (projectToAddTask != null)
       {
           projectToAddTask.Tasks?.Add(task);
       }
       
       await _context.SaveChangesAsync();

       return task;
    }

    public async Task<TaskItem> UpdateTask(TaskItem task, long id)
    {
        var taskToUpdate = await _context.Tasks.FirstAsync(t => t.Id == id);

        _context.Entry(taskToUpdate).CurrentValues.SetValues(task);
        await _context.SaveChangesAsync();

        return taskToUpdate;
    }

    public async Task<TaskItem> DeleteTask(long id)
    {
        var taskToRemove = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);

        if (taskToRemove != null)
        {
            _context.Tasks.Remove(taskToRemove);
        }

        await _context.SaveChangesAsync();

        return taskToRemove;
    }
}