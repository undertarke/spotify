using Api_Youtube.Dto;
using Api_Youtube.Dto.Response;
using Api_Youtube.Model;

namespace Api_Youtube.Repository;

public interface VideoRepository
{
    Task<bool> CreateAsync(Video video);
    Task<PaginatedList<PublicVideoResponseDto>> GetPublicVideosAsync(int pageNumber, int pageSize);
    Task<List<Video>> GetUserVideosAsync(int userId);
    Task<Video?> GetVideoByIdAsync(int videoId);
    Task<bool> DeleteAsync(Video video);
    Task<bool> SaveChangesAsync();
    Task<List<Video>> SearchVideosAsync(string keyword);
    Task<List<VideoDto>> GetTopVideosWithEngagementAsync(int topCount);
    Task<List<VideoDto>> GetWatchedVideosByUserAsync(int userId);
}