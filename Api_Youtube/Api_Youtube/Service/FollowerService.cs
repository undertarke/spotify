using Api_Youtube.Dto;

namespace Api_Youtube.Service;

public interface FollowerService
{
    Task<bool> FollowUserAsync(int followerUserId, int followingUserId);
    Task<bool> UnfollowUserAsync(int followerUserId, int followingUserId);
    Task<List<UserDto>> GetFollowersAsync(int userId);
    Task<List<UserDto>> GetFollowingAsync(int userId);
}