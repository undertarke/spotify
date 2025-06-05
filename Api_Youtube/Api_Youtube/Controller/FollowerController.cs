using Api_Youtube.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api_Youtube.Controller;

[Route("api/followers")]
[ApiController]
public class FollowerController : BaseController
{
    private readonly FollowerService _followerService;

    public FollowerController(FollowerService followerService)
    {
        _followerService = followerService;
    }

    [Authorize]
    [HttpPost("follow/{userId}")]
    public async Task<IActionResult> FollowUser(int userId)
    {
        var currentUserId = GetUserIdFromClaims();

        if (currentUserId == 0 || currentUserId == userId)
            return BadRequest(new { message = "Invalid user." });

        var result = await _followerService.FollowUserAsync(currentUserId, userId);

        return result
            ? Ok(new { message = "Followed successfully." })
            : BadRequest(new { message = "Failed to follow." });
    }

    [Authorize]
    [HttpPost("unfollow/{userId}")]
    public async Task<IActionResult> UnfollowUser(int userId)
    {
        var currentUserId = GetUserIdFromClaims();

        if (currentUserId == 0 || currentUserId == userId)
            return BadRequest(new { message = "Invalid user." });

        var result = await _followerService.UnfollowUserAsync(currentUserId, userId);

        return result
            ? Ok(new { message = "Unfollowed successfully." })
            : BadRequest(new { message = "Failed to unfollow." });
    }

    [HttpGet("followers/{userId}")]
    public async Task<IActionResult> GetFollowers(int userId)
    {
        var followers = await _followerService.GetFollowersAsync(userId);
        return Ok(followers);
    }

    [HttpGet("following/{userId}")]
    public async Task<IActionResult> GetFollowing(int userId)
    {
        var following = await _followerService.GetFollowingAsync(userId);
        return Ok(following);
    }
}