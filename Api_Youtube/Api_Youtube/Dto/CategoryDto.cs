using System.ComponentModel.DataAnnotations;

namespace Api_Youtube.Dto;

public class CategoryDto
{
    [MaxLength(255)]
    public string Name { get; set; }
}