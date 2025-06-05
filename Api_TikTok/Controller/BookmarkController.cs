using Api_TikTok.Dto;
using Api_TikTok.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api_TikTok.Controller
{
    [Route("api/bookmarks")]
    [ApiController]
    [Authorize]
    public class BookmarkController : BaseController
    {
        private readonly BookmarkService _bookmarkService;

        public BookmarkController(BookmarkService bookmarkService)
        {
            _bookmarkService = bookmarkService;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetBookmarksByUserId(int userId)
        {
            var bookmarks = await _bookmarkService.GetUserBookmarksAsync(userId);

            if (bookmarks == null || bookmarks.Count == 0)
            {
                return NotFound("No bookmarks found.");
            }

            return Ok(bookmarks);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddBookmark([FromBody] BookmarkDto bookmarkDto)
        {
            var userId = GetUserIdFromClaims(); 

            if (userId == 0)
            {
                return Unauthorized("User not found.");
            }

            var addedBookmark = await _bookmarkService.AddBookmarkAsync(userId, bookmarkDto.VideoId);
            return Ok(new { message = "Video added to bookmarks.", bookmark = addedBookmark });
        }
    }
}
