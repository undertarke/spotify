using System.Linq.Expressions;
using Api_Youtube.Dto;
using Api_Youtube.Dto.Request;
using Api_Youtube.Dto.Response;
using Api_Youtube.Model;

namespace Api_Youtube.Service;

public interface VideoService
{
    Task<bool> UploadVideoAsync(int userId, UploadVideoRequestDto request);
    Task<List<PublicVideoResponseDto>> GetPublicVideosAsync(int pageNumber, int pageSize);
    Task<List<VideoDto>> GetUserVideosAsync(int userId, bool isLoggedIn);
    Task<bool> UpdateVideoAsync(int videoId, int userId, UpdateVideoRequestDto request);
    Task<bool> DeleteVideoAsync(int videoId, int userId);
    Task<List<VideoDto>> SearchVideosAsync(string keyword);
    Task<List<VideoDto>> GetTopVideosByEngagementAsync(int topCount);
    Task AddHistoryAsync(int userId, int videoId);
    Task<List<VideoDto>> GetWatchedVideosByUserIdAsync(int userId);
}