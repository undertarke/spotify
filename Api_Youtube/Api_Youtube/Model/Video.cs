using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Youtube.Model
{
    public class Video
    {
        [Key] public int Id { get; set; }

        [ForeignKey("User")]
        [Column("user_id")]
        public int UserId { get; set; }

        public User User { get; set; }

        [Column("title")]
        public string? Title { get; set; } 

        [Column(TypeName = "text")]
        public string? Description { get; set; } 

        [Column("hashtags")]
        public string? Hashtags { get; set; } 

        [Column("privacy_level")]
        public string PrivacyLevel { get; set; } = "public";

        [Column("video_url")]
        public string? VideoUrl { get; set; } 

        [Column("related_video_ids")]
        public string? RelatedVideoIds { get; set; } 

        [Column("duration_in_seconds")]
        public int DurationInSeconds { get; set; }

        [Column("views_count")]
        public int ViewsCount { get; set; } = 0;

        [Column("video_type")]
        public string? VideoType { get; set; } 

        [ForeignKey("Category")]
        [Column("category_id")]
        public int? CategoryId { get; set; }

        public Category? Category { get; set; }

        public ICollection<Comment> Comments { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<Bookmark> Bookmarks { get; set; }
        
        public ICollection<HistoryVideo> HistoryVideos { get; set; }
    }
}