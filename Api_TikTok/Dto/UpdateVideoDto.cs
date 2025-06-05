using Api_TikTok.Common;

namespace Api_TikTok.Dto
{
    public class UpdateVideoDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Hashtags { get; set; }
        public PrivacyLevel PrivacyLevel { get; set; }
    }
}
