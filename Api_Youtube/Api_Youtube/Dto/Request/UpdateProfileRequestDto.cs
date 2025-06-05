using System.ComponentModel.DataAnnotations;

namespace Api_Youtube.Dto.Request;

public class UpdateProfileRequestDto
{
    [MaxLength(255)]
    public string? Username { get; set; }
        
    [MaxLength(255)]
    public string? Bio { get; set; }
        
    public IFormFile? Avatar { get; set; }
}