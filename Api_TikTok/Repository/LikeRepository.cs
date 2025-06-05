using Api_TikTok.Model;

namespace Api_TikTok.Repository
{
    public interface LikeRepository
    {
        Task<Like> AddLikeAsync(int userId, int videoId);
        Task<Like> ToggleLikeAsync(int userId, int videoId, bool isLiked);
    }
}
