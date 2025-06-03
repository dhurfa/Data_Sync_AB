using System.ComponentModel.DataAnnotations;

namespace WebsiteB.Models
{

    public class Users
    {
        [Key]
        public int UserId { get; set; }

        [System.ComponentModel.DataAnnotations.Required]
        public string Username { get; set; }
        [System.ComponentModel.DataAnnotations.Required]
        public byte[] Password { get; set; }
        public byte[] PasswordKey { get; set; }

    }
}
