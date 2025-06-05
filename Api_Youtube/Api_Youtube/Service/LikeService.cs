using Api_Youtube.Model;

namespace Api_Youtube.Service;

public interface LikeService
{
    Task<Like> ToggleLikeAsync(int userId, int videoId, bool isLiked);
}