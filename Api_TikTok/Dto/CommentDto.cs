namespace Api_TikTok.Model.DTO
{
    public class CommentDto
    {
        public int VideoId { get; set; }
        public string Content { get; set; }
        public int? CommentId { get; set; }
    }
}
