using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations;

namespace DateEntryWebApi.Models
{
    public class User
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