using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Youtube.Model;

[Table("bookmarks")]
public class Bookmark
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [ForeignKey("User")]
    [Column("user_id")]
    public int UserId { get; set; }

    public User User { get; set; }

    [ForeignKey("Video")]
    [Column("video_id")]
    public int VideoId { get; set; }

    public Video Video { get; set; }
}