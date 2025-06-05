using Api_Youtube.Dto;
using Api_Youtube.Dto.Response;
using Api_Youtube.Repository;

namespace Api_Youtube.Service.Impl;

public class BookmarkServiceImpl : BookmarkService
{
    private readonly BookmarkRepository _bookmarkRepository;

    public BookmarkServiceImpl(BookmarkRepository bookmarkRepository)
    {
        _bookmarkRepository = bookmarkRepository;
    }

    public async Task<List<BookmarkResponseDto>> GetUserBookmarksAsync(int userId)
    {
        var bookmarks = await _bookmarkRepository.GetBookmarksByUserIdAsync(userId);
        var bookmarkDtos = bookmarks.Select(b => new BookmarkResponseDto
        {
            VideoId = b.VideoId,
            Title = b.Video.Title,
            Description = b.Video.Description,
            VideoUrl = b.Video.VideoUrl
        }).ToList();

        return bookmarkDtos;
    }

    public async Task<BookmarkResponseDto> AddBookmarkAsync(int userId, int videoId)
    {
        var bookmark = await _bookmarkRepository.AddBookmarkAsync(userId, videoId);

        return new BookmarkResponseDto
        {
            VideoId = bookmark.VideoId,
        };
    }
}