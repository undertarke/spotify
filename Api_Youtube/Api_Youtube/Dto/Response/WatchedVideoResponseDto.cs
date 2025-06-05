namespace Api_Youtube.Dto.Response;

public class WatchedVideoResponseDto
{
      public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Hashtags { get; set; }
        public string PrivacyLevel { get; set; }
        public string VideoUrl { get; set; }
        public int ViewsCount { get; set; }
}