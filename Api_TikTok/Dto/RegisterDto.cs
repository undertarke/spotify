using System.ComponentModel.DataAnnotations;

namespace Api_TikTok.Dto
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(255)]
        public string Username { get; set; }

        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        [MaxLength(255)]
        public string Password { get; set; }

    }
}
