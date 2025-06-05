using System.ComponentModel.DataAnnotations;

namespace Api_TikTok.Dto
{
    public class LoginDto
    {
        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        [MaxLength(255)]
        public string Username { get; set; }

        public string Token { get; set; }

    }
}
