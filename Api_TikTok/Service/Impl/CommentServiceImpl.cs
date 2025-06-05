using Api_TikTok.Model;
using Api_TikTok.Repository;

namespace Api_TikTok.Service.Impl
{
    public class CommentServiceImpl : CommentService
    {
        private readonly CommentRepository _commentRepository;

        public CommentServiceImpl(CommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<Comment> AddCommentAsync(int userId, int videoId, string content)
        {
            return await _commentRepository.AddCommentAsync(userId, videoId, content);
        }

        public async Task<Comment> EditCommentAsync(int commentId, string content)
        {
            return await _commentRepository.EditCommentAsync(commentId, content);
        }

        public async Task<bool> DeleteCommentAsync(int commentId)
        {
            return await _commentRepository.DeleteCommentAsync(commentId);
        }
    }
}
