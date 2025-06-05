using Api_TikTok.Dto;

namespace Api_TikTok.Service
{
    public interface BookmarkService
    {
        Task<List<BookmarkDto>> GetUserBookmarksAsync(int userId);
        Task<BookmarkDto> AddBookmarkAsync(int userId, int videoId);
    }
}
