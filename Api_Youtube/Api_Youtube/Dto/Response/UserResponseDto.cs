namespace Api_Youtube.Dto.Response;

public class UserResponseDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string? Avatar { get; set; }
    public string? Bio { get; set; }
    public List<VideoResponseDto> PublicVideos { get; set; } = new();

}