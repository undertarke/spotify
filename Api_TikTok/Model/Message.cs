using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Api_TikTok.Model
{
    [Table("messages")]
    public class Message
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("Sender")]
        [Column("sender_user_id")]
        public int SenderUserId { get; set; }
        public User Sender { get; set; }

        [ForeignKey("Receiver")]
        [Column("receiver_user_id")]
        public int ReceiverUserId { get; set; }
        public User Receiver { get; set; }

        public string Content { get; set; }


        [Column("message_type")]
        public string MessageType { get; set; }
    }
}
