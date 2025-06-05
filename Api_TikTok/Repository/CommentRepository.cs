using Api_TikTok.Model;

namespace Api_TikTok.Repository
{
    public interface CommentRepository
    {
        Task<Comment> AddCommentAsync(int userId, int videoId, string content);
        Task<Comment> EditCommentAsync(int commentId, string content);
        Task<bool> DeleteCommentAsync(int commentId);
    }
}
