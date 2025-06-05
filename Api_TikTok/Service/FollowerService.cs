using Api_TikTok.Dto;

namespace Api_TikTok.Service
{
    public interface FollowerService
    {
        Task<bool> FollowUserAsync(int followerUserId, int followingUserId);
        Task<bool> UnfollowUserAsync(int followerUserId, int followingUserId);
        Task<List<UserDto>> GetFollowersAsync(int userId);
        Task<List<UserDto>> GetFollowingAsync(int userId);
    }

}
