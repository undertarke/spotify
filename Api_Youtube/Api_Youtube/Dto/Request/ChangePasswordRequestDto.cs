using System.ComponentModel.DataAnnotations;

namespace Api_Youtube.Dto.Request;

public class ChangePasswordRequestDto
{
    [MaxLength(100)]
    public string OldPassword { get; set; }
        
    [MaxLength(100)]
    public string NewPassword { get; set; }
}