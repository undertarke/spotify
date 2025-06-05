using Api_Youtube.Model;
using Api_Youtube.Repository;

namespace Api_Youtube.Service.Impl;

public class LikeServiceImpl : LikeService
{
    private readonly LikeRepository _likeRepository;

    public LikeServiceImpl(LikeRepository likeRepository)
    {
        _likeRepository = likeRepository;
    }

    public async Task<Like> ToggleLikeAsync(int userId, int videoId, bool isLiked)
    {
        return await _likeRepository.ToggleLikeAsync(userId, videoId, isLiked);
    }
}