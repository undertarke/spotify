using Api_TikTok.Model;
using Api_TikTok.Repository;

namespace Api_TikTok.Service.Impl
{
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
}
