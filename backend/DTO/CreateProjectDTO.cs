using backend.Models.Entities;
using backend.Models.Enums;

namespace backend.DTO
{
    public class CreateProjectDTO
    {
        public long ManagerId { get; set; }
        public string ProjectName { get; set; }
        public string Description { get; set; }

        public Status ProjectStatus{ get; set; }

    }
}
