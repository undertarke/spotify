using Api_Youtube.Common;

namespace Api_Youtube.Dto.Request;

public class UpdateVideoRequestDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Hashtags { get; set; }
    public PrivacyLevel PrivacyLevel { get; set; }
}