using backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.TaskServiceLayer;

public interface ITaskService
{
    Task<List<TaskItem>> GetAllTasks();
    Task<TaskItem?> GetTaskById(long id);
    Task<List<User>> GetUsersByTaskId(long id);
    Task<List<TaskItem>> GetTasksByUserId(long userId);
    Task<List<User>> AddUserToTask(long id, long userId);
    Task<User> RemoveUserFromTask(long id, long userid);
    Task<TaskItem> CreateTask(long projectId, TaskItem task);
    Task<TaskItem> UpdateTask(TaskItem task, long id);
    Task<TaskItem> DeleteTask(long id);
}