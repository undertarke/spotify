using Api_Youtube.Model;

namespace Api_Youtube.Repository;

public interface BookmarkRepository
{
    Task<List<Bookmark>> GetBookmarksByUserIdAsync(int userId);
    Task<Bookmark> AddBookmarkAsync(int userId, int videoId);

}