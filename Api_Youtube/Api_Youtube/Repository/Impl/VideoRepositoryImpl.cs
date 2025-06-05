using System.Linq.Expressions;
using Api_Youtube.Data;
using Api_Youtube.Dto;
using Api_Youtube.Dto.Response;
using Api_Youtube.Model;
using Microsoft.EntityFrameworkCore;

namespace Api_Youtube.Repository.Impl;

public class VideoRepositoryImpl : VideoRepository
{
    private readonly AppDbContext _context;

    public VideoRepositoryImpl(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByIdAsync(int id) => await _context.Users.FindAsync(id);

    public async Task<bool> CreateAsync(Video video)
    {
        _context.Videos.AddAsync(video);
        return await _context.SaveChangesAsync() > 0;
    }
    
    public async Task<List<Video>> GetUserVideosAsync(int userId)
    {
        return await _context.Videos
            .Include(v => v.User)
            .Where(v => v.UserId == userId)
            .ToListAsync();
    }
    public async Task<PaginatedList<PublicVideoResponseDto>> GetPublicVideosAsync(int pageNumber, int pageSize)
    {
        var videosQuery = _context.Videos
            .Include(v => v.User)
            .Where(v => v.PrivacyLevel == "Public")
            .Select(v => new PublicVideoResponseDto
            {
                Id = v.Id,
                Title = v.Title,
                Description = v.Description,
                Hashtags = v.Hashtags,
                PrivacyLevel = v.PrivacyLevel,
                VideoUrl = v.VideoUrl,
                UserId = v.UserId,
                UserName = v.User.Username, 
                ViewsCount = _context.HistoryVideos.Count(h => h.VideoId == v.Id),
                LikesCount = _context.Likes.Count(l => l.VideoId == v.Id),
                TotalViewVideo = _context.HistoryVideos.Count(h => h.VideoId == v.Id) + _context.Likes.Count(l => l.VideoId == v.Id)
            });

        var videosPaged = await videosQuery
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var totalCount = await videosQuery.CountAsync();

        return new PaginatedList<PublicVideoResponseDto>(videosPaged, totalCount, pageNumber, pageSize);
    }
    
    public async Task<Video?> GetVideoByIdAsync(int videoId)
    {
        return await _context.Videos.Include(v => v.User).FirstOrDefaultAsync(v => v.Id == videoId);
    }

    public async Task<bool> DeleteAsync(Video video)
    {
        _context.Videos.Remove(video);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
    public async Task<List<Video>> SearchVideosAsync(string keyword)
    {
        return await _context.Videos
            .Include(v => v.User)
            .Where(v => EF.Functions.Like(v.Title, $"%{keyword}%") ||
                        EF.Functions.Like(v.Description, $"%{keyword}%") ||
                        EF.Functions.Like(v.Hashtags, $"%{keyword}%"))
            .Where(v => v.PrivacyLevel == "public")
            .ToListAsync();
    }
    
    public async Task<List<VideoDto>> GetVideosWithViewCountsAsync()
    {
        return await _context.Videos
            .Select(v => new VideoDto
            {
                Id = v.Id,
                Title = v.Title,
                Description = v.Description,
                Hashtags = v.Hashtags,
                PrivacyLevel = v.PrivacyLevel,
                VideoUrl = v.VideoUrl,
                UserId = v.UserId,
                UserName = v.User.Username,
                ViewsCount = _context.HistoryVideos.Count(h => h.VideoId == v.Id)
            })
            .ToListAsync();
    }

    public async Task<List<VideoDto>> GetTopVideosWithEngagementAsync(int topCount)
    {
        var videoData = await _context.Videos
            .Select(v => new
            {
                v.Id,
                v.Title,
                v.VideoUrl,
                v.UserId,
                UserName = v.User.Username,
                ViewsCount = _context.HistoryVideos.Count(hv => hv.VideoId == v.Id),
                LikesCount = _context.Likes.Count(l => l.VideoId == v.Id),
            })
            .ToListAsync();

        return videoData
            .Select(v => new VideoDto
            {
                Id = v.Id,
                Title = v.Title,
                VideoUrl = v.VideoUrl,
                UserId = v.UserId,
                UserName = v.UserName,
                ViewsCount = v.ViewsCount,
                LikesCount = v.LikesCount,
                TotalViewVideo = v.ViewsCount + v.LikesCount
            })
            .OrderByDescending(v => v.TotalViewVideo)
            .Take(topCount)
            .ToList();
    }
    
    public async Task<List<VideoDto>> GetWatchedVideosByUserAsync(int userId)
    {
        return await _context.HistoryVideos
            .Where(h => h.UserId == userId)
            .OrderByDescending(h => h.ViewTime)
            .Select(h => new VideoDto
            {
                Id = h.Video.Id,
                Title = h.Video.Title,
                VideoUrl = h.Video.VideoUrl,
                Description = h.Video.Description,
                Hashtags = h.Video.Hashtags,
                UserId = h.Video.UserId,
                UserName = h.Video.User.Username
            })
            .ToListAsync();
    }

}