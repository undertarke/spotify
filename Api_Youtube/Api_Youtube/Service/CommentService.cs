using Api_Youtube.Model;

namespace Api_Youtube.Service;

public interface CommentService
{
    Task<Comment> AddCommentAsync(int userId, int videoId, string content);
    Task<Comment> EditCommentAsync(int commentId, string content);
    Task<bool> DeleteCommentAsync(int commentId);
}