using Api_TikTok.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api_TikTok.Controller
{
    [Route("api/likes")]
    [ApiController]
    public class LikeController : BaseController
    {
        private readonly LikeService _likeService;

        public LikeController(LikeService likeService)
        {
            _likeService = likeService;
        }

        [Authorize]
        [HttpPost("toggle-like/{videoId}")]
        public async Task<IActionResult> ToggleLike(int videoId, [FromBody] bool isLiked)
        {
            var userId = GetUserIdFromClaims();

            if (userId == 0)
                return Unauthorized(new { message = "User is not authenticated." });

            var like = await _likeService.ToggleLikeAsync(userId, videoId, isLiked);

            if (like == null)
                return NotFound(new { message = "Video not found." });

            return Ok(like);
        }
    }
}
