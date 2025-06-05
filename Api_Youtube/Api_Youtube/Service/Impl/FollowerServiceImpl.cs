using Api_Youtube.Dto;
using Api_Youtube.Model;
using Api_Youtube.Repository;

namespace Api_Youtube.Service.Impl;

public class FollowerServiceImpl : FollowerService
{
    private readonly FollowerRepository _followerRepository;

    public FollowerServiceImpl(FollowerRepository followerRepository)
    {
        _followerRepository = followerRepository;
    }

    public async Task<bool> FollowUserAsync(int followerUserId, int followingUserId)
    {
        return await _followerRepository.FollowUserAsync(followerUserId, followingUserId);
    }

    public async Task<bool> UnfollowUserAsync(int followerUserId, int followingUserId)
    {
        return await _followerRepository.UnfollowUserAsync(followerUserId, followingUserId);
    }

    public async Task<List<UserDto>> GetFollowersAsync(int userId)
    {
        var followers = await _followerRepository.GetFollowersAsync(userId);
        return followers.Select(u => new UserDto
        {
            Id = u.Id,
            Username = u.Username,
            Avatar = u.Avatar
        }).ToList();
    }

    public async Task<List<UserDto>> GetFollowingAsync(int userId)
    {
        var following = await _followerRepository.GetFollowingAsync(userId);
        return following.Select(u => new UserDto
        {
            Id = u.Id,
            Username = u.Username,
            Avatar = u.Avatar
        }).ToList();
    }
}