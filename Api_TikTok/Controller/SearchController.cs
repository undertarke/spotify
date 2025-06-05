using Api_TikTok.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_TikTok.Controller
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly VideoService _videoService;
        private readonly UserService _userService;

        public SearchController(VideoService videoService, UserService userService)
        {
            _videoService = videoService;
            _userService = userService;
        }

        [HttpGet("videos")]
        public async Task<IActionResult> SearchVideos([FromQuery] string keyword)
        {
            var videos = await _videoService.SearchVideosAsync(keyword);
            return Ok(videos);
        }

        [HttpGet("users")]
        public async Task<IActionResult> SearchUsers([FromQuery] string keyword)
        {
            var users = await _userService.SearchUsersAsync(keyword);
            return Ok(users);
        }
    }

}
