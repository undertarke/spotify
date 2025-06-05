using System.ComponentModel.DataAnnotations;

namespace Api_Youtube.Dto.Request;

public class LoginRequestDto
{
    [Required]
    [MaxLength(255)]
    public string? Email { get; set; }

    [Required]
    [MaxLength(255)]
    public string? Password { get; set; }
}