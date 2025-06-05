using Api_TikTok.Model.DTO;
using Api_TikTok.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api_TikTok.Controller
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : BaseController
    {
        private readonly CommentService _commentService;

        public CommentController(CommentService commentService)
        {
            _commentService = commentService;
        }

        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> AddComment([FromBody] CommentDto commentDto)
        {
            var userId = GetUserIdFromClaims();

            if (userId == 0)
                return Unauthorized(new { message = "User is not authenticated." });

            var comment = await _commentService.AddCommentAsync(userId, commentDto.VideoId, commentDto.Content);
            return CreatedAtAction(nameof(AddComment), new { id = comment.Id }, comment);
        }

        [Authorize]
        [HttpPut("edit/{commentId}")]
        public async Task<IActionResult> EditComment(int commentId, [FromBody] CommentDto commentDto)
        {
            var userId = GetUserIdFromClaims();

            if (userId == 0)
                return Unauthorized(new { message = "User is not authenticated." });

            var comment = await _commentService.EditCommentAsync(commentId, commentDto.Content);

            if (comment == null)
                return NotFound(new { message = "Comment not found." });

            return Ok(comment);
        }

        [Authorize]
        [HttpDelete("delete/{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            var userId = GetUserIdFromClaims();

            if (userId == 0)
                return Unauthorized(new { message = "User is not authenticated." });

            var isDeleted = await _commentService.DeleteCommentAsync(commentId);

            if (!isDeleted)
                return NotFound(new { message = "Comment not found." });

            return NoContent();
        }
    }
}
