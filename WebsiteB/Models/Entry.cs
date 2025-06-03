using System.ComponentModel.DataAnnotations;

namespace WebsiteB.Models
{
    public class Entry
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(35, MinimumLength = 5)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(35, MinimumLength = 5)]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public DateTime Born { get; set; }
        [Required]
        public DateTime Admission { get; set; }
        [Required]
        [StringLength(100)]
        public string PracticingArea { get; set; }
        [Required]
        public string PracticeLocation { get; set; }
        [Required]
        public string Position { get; set; }

    }
}
