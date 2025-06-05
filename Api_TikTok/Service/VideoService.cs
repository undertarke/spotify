using Api_TikTok.Dto;

namespace Api_TikTok.Service
{
    public interface VideoService
    {
        Task<bool> UploadVideoAsync(int userId, UploadVideoDto request);
        Task<List<VideoDto>> GetPublicVideosAsync();

        Task<List<VideoDto>> GetUserVideosAsync(int userId, bool isLoggedIn);
        Task<bool> UpdateVideoAsync(int videoId, int userId, UpdateVideoDto request);
        Task<bool> DeleteVideoAsync(int videoId, int userId);
        Task<List<VideoDto>> SearchVideosAsync(string keyword);

    }
}
