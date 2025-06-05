using Api_Youtube.Dto;
using Api_Youtube.Dto.Response;

namespace Api_Youtube.Service;

public interface BookmarkService
{
    Task<List<BookmarkResponseDto>> GetUserBookmarksAsync(int userId);
    Task<BookmarkResponseDto> AddBookmarkAsync(int userId, int videoId);
}