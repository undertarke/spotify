using Api_Youtube.Model;

namespace Api_Youtube.Repository;

public interface LikeRepository
{
    Task<Like> AddLikeAsync(int userId, int videoId);
    Task<Like> ToggleLikeAsync(int userId, int videoId, bool isLiked);
}