using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Youtube.Model;
[Table("followers")]
public class Follower
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [ForeignKey("FollowerUser")]
    [Column("follower_user_id")] 
    public int FollowerUserId { get; set; }
    public User FollowerUser { get; set; }  // Người theo dõi

    [ForeignKey("FollowingUser")]
    [Column("following_user_id")]
    public int FollowingUserId { get; set; }
    public User FollowingUser { get; set; }  // Người được theo dõi
}