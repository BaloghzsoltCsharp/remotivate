using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    public class TaskItemNotes
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public long UserWhoCreated { get; set; }

        public string Note { get; set; } = "";
    }
}
