using System.ComponentModel.DataAnnotations;
using Api_Youtube.Common;

namespace Api_Youtube.Dto.Request;

public class UploadVideoRequestDto
{
    public IFormFile? Video { get; set; }

    [MaxLength(255)] public string? Title { get; set; }

    [MaxLength(255)] public string? Description { get; set; }
    [MaxLength(255)] public string? Hashtags { get; set; }
    public VideoType VideoType { get; set; }
    public PrivacyLevel PrivacyLevel { get; set; }
    public int? CategoryId { get; set; }
}