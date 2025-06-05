﻿namespace Api_TikTok.Dto
{
    public class VideoDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Hashtags { get; set; }
        public string PrivacyLevel { get; set; }
        public string? VideoUrl { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
    }
}
