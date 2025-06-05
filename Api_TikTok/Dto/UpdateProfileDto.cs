namespace Api_TikTok.Dto
{
    public class UpdateProfileDto
    {
        public string? Username { get; set; }
        public string? Bio { get; set; }
        public IFormFile? Avatar { get; set; }
    }

}
