using Api_Youtube.Data;
using Api_Youtube.Model;
using Microsoft.EntityFrameworkCore;

namespace Api_Youtube.Repository.Impl;

public class FollowerRepositoryImpl : FollowerRepository
{
    private readonly AppDbContext _context;

    public FollowerRepositoryImpl(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> FollowUserAsync(int followerUserId, int followingUserId)
    {
        if (await _context.Followers.AnyAsync(f => f.FollowerUserId == followerUserId && f.FollowingUserId == followingUserId))
            return false;

        _context.Followers.Add(new Follower
        {
            FollowerUserId = followerUserId,
            FollowingUserId = followingUserId
        });

        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> UnfollowUserAsync(int followerUserId, int followingUserId)
    {
        var follow = await _context.Followers.FirstOrDefaultAsync(f => f.FollowerUserId == followerUserId && f.FollowingUserId == followingUserId);

        if (follow == null)
            return false;

        _context.Followers.Remove(follow);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<List<User>> GetFollowersAsync(int userId)
    {
        return await _context.Followers
            .Where(f => f.FollowingUserId == userId)
            .Select(f => f.FollowerUser)
            .ToListAsync();
    }

    public async Task<List<User>> GetFollowingAsync(int userId)
    {
        return await _context.Followers
            .Where(f => f.FollowerUserId == userId)
            .Select(f => f.FollowingUser)
            .ToListAsync();
    }
}