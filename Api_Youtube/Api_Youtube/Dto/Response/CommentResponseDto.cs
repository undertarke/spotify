namespace Api_Youtube.Dto.Response;

public class CommentResponseDto
{
    public int Id { get; set; }
    public int VideoId { get; set; }
    public string Content { get; set; }
    public int UserId { get; set; }
}