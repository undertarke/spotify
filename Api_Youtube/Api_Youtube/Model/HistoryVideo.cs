using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Youtube.Model
{
    [Table("history_videos")]
    public class HistoryVideo
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("User")]
        [Column("user_id")]
        public int UserId { get; set; }

        [Required]
        [ForeignKey("Video")]
        [Column("video_id")]
        public int VideoId { get; set; }
        
        [Column("view_time")]
        public DateTime ViewTime { get; set; } = DateTime.UtcNow;

        public User User { get; set; }
        public Video Video { get; set; }
    }
}