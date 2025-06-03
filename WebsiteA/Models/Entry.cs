using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DateEntryWebApi.Models
{
    public class Entry : IValidatableObject
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(35 , MinimumLength = 5, ErrorMessage = "First Name must contain atleast 5 characters and no more than 35 characters")]
        public string FirstName { get; set; }
        [Required]
        [StringLength(35, MinimumLength = 5, ErrorMessage = "Last Name must contain atleast 5 characters and no more than 35 characters")]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public DateTime Born { get; set; }
        [Required]
        public DateTime Admission { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "Practicing area cannot be more than 100 characters")]
        public string PracticingArea { get; set; }
        [Required]
        public string PracticeLocation { get; set; }
        [Required]
        public string Position { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if(Born.Year > 1996)
            {
                yield return new ValidationResult("Date of Birth is invalid");
            }

            if(Admission.Year <= 1950 && Admission.Year >= 2022)
            {
                yield return new ValidationResult("Date of Admission is invalid");
            }
        }
    }
}

