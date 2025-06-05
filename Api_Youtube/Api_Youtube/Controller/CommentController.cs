using Api_Youtube.Dto;
using Api_Youtube.Dto.Request;
using Api_Youtube.Dto.Response;
using Api_Youtube.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace Api_Youtube.Controller
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
        [HttpPost("add/{videoId}")]
        public async Task<IActionResult> AddComment(int videoId, [FromBody] CommentRequestDto request)
        {
            var userId = GetUserIdFromClaims();

            if (userId == 0)
                return Unauthorized(new { message = "User is not authenticated." });

            var comment = await _commentService.AddCommentAsync(userId, videoId, request.Content);
            var response = new CommentResponseDto
            {
                Id = comment.Id,
                VideoId = comment.VideoId,
                Content = comment.Content,
                UserId = comment.UserId
            };
            return CreatedAtAction(nameof(AddComment), new { id = response.Id }, response);
        }

        [Authorize]
        [HttpPut("edit/{commentId}")]
        public async Task<IActionResult> EditComment(int commentId, [FromBody] CommentRequestDto request)
        {
            var userId = GetUserIdFromClaims();

            if (userId == 0)
                return Unauthorized(new { message = "User is not authenticated." });

            var comment = await _commentService.EditCommentAsync(commentId, request.Content);

            if (comment == null)
                return NotFound(new { message = "Comment not found." });

            var response = new CommentResponseDto
            {
                Id = comment.Id,
                VideoId = comment.VideoId,
                Content = comment.Content,
                UserId = comment.UserId
            };
            return Ok(response);
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
