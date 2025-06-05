using Api_TikTok.Data;
using Api_TikTok.Model;

namespace Api_TikTok.Repository.Impl
{
    public class CommentRepositoryImpl : CommentRepository
    {
        private readonly AppDbContext _context;

        public CommentRepositoryImpl(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Comment> AddCommentAsync(int userId, int videoId, string content)
        {
            var comment = new Comment
            {
                UserId = userId,
                VideoId = videoId,
                Content = content
            };
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<Comment> EditCommentAsync(int commentId, string content)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment != null)
            {
                comment.Content = content;
                await _context.SaveChangesAsync();
            }
            return comment;
        }

        public async Task<bool> DeleteCommentAsync(int commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
