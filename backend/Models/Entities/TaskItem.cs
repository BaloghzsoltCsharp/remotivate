using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models.Entities;

public class TaskItem
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }

    public List<TaskItemNotes>? Notes { get; set; } = new List<TaskItemNotes>();

    public List<User>? UsersOnTask { get; set; } = new List<User>();

    public long ProjectId { get; set; } // The Project its part of

    public long? DateId { get; set; }

    public string Description { get; set; }

    public Status? TaskStatus { get; set; }
}