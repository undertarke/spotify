namespace Api_Youtube.Dto.Response;

public class TopVideoResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string PrivacyLevel { get; set; }
    public string VideoUrl { get; set; }
    public int UserId { get; set; }
    public string? UserName { get; set; }
}