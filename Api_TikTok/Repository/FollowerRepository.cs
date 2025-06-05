using Api_TikTok.Model;

namespace Api_TikTok.Repository
{
    public interface FollowerRepository
    {
        Task<bool> FollowUserAsync(int followerUserId, int followingUserId);
        Task<bool> UnfollowUserAsync(int followerUserId, int followingUserId);
        Task<List<User>> GetFollowersAsync(int userId);
        Task<List<User>> GetFollowingAsync(int userId);
    }

}
