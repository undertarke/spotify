using Api_TikTok.Model;

namespace Api_TikTok.Service
{
    public interface LikeService
    {
        Task<Like> ToggleLikeAsync(int userId, int videoId, bool isLiked);
    }
}
