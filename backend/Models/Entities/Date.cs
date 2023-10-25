using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    public class Date
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        
        public string CreatedDate { get; set; }

        public string DeadLine { get; set; }

        public string? LatestModification { get; set; }

        public string? CompletedOn { get; set; }

        public long? TaskId { get; set; }

        public long? ProjectId { get; set; }


    }
}
