using Api_TikTok.Data;
using Api_TikTok.Model;
using Microsoft.EntityFrameworkCore;

namespace Api_TikTok.Repository.Impl
{
    public class BookmarkRepositoryImpl : BookmarkRepository
    {
        private readonly AppDbContext _context;

        public BookmarkRepositoryImpl(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Bookmark>> GetBookmarksByUserIdAsync(int userId)
        {
            return await _context.Bookmarks
                .Where(b => b.UserId == userId)
                .Include(b => b.Video) 
                .ToListAsync();
        }

        public async Task<Bookmark> AddBookmarkAsync(int userId, int videoId)
        {
            var bookmark = new Bookmark
            {
                UserId = userId,
                VideoId = videoId
            };

            await _context.Bookmarks.AddAsync(bookmark);
            await _context.SaveChangesAsync();

            return bookmark;
        }
    }
}
