namespace Api_Youtube.Dto.Response;

public class BookmarkResponseDto
{
    public int VideoId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? VideoUrl { get; set; }
}