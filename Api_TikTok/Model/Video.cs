﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Api_TikTok.Model
{
    [Table("videos")]
    public class Video
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }
        public User User { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public string Hashtags { get; set; }

        [Column("privacy_level")]
        public string PrivacyLevel { get; set; } = "public";


        [Column("video_url")]
        public string? VideoUrl { get; set; } 
            
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<Bookmark> Bookmarks { get; set; }
    }
}
