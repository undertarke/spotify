using Api_TikTok.Model;

namespace Api_TikTok.Repository
{
    public interface BookmarkRepository
    {
        Task<List<Bookmark>> GetBookmarksByUserIdAsync(int userId);
        Task<Bookmark> AddBookmarkAsync(int userId, int videoId);

    }
}
