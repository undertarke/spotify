using Api_TikTok.Common;

namespace Api_TikTok.Dto
{
    public class UploadVideoDto
    {
        public IFormFile? Video { get; set; } 
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Hashtags { get; set; }
        public PrivacyLevel PrivacyLevel { get; set; }

    }

    //public enum PrivacyLevel
    //{
    //    Public = 1,
    //    Private = 2,
    //    Friends = 3
    //}
}
