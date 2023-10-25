using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models.Entities;

public class Project
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }

    public long ManagerId { get; set; } // The user of the one in charge of the project

    public long? DateId { get; set; }

    public List<User>? UsersOnProject { get; set; }=new List<User>();

    public List<TaskItem>? Tasks { get; set; }= new List<TaskItem>();

    public Status? ProjectStatus { get; set; }

    public string Description { get; set; } = "";
}