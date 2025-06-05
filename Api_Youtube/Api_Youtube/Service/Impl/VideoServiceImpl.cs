using System.Linq.Expressions;
using Api_Youtube.Common;
using Api_Youtube.Data;
using Api_Youtube.Dto;
using Api_Youtube.Dto.Request;
using Api_Youtube.Dto.Response;
using Api_Youtube.Model;
using Api_Youtube.Repository;
using MediaToolkit.Model;

namespace Api_Youtube.Service.Impl;

public class VideoServiceImpl : VideoService
{
    private readonly VideoRepository _videoRepository;
    private readonly UserRepository _userRepository;
    private readonly CategoryRepository _categoryRepository;
    private readonly HistoryVideoRepository _historyVideoRepository;
    private readonly AppDbContext _context;

    public VideoServiceImpl(VideoRepository videoRepository, AppDbContext context,
        UserRepository userRepository, CategoryRepository categoryRepository,
        HistoryVideoRepository historyVideoRepository)
    {
        _context = context;
        _userRepository = userRepository;
        _categoryRepository = categoryRepository;
        _historyVideoRepository = historyVideoRepository;
        _videoRepository = videoRepository ?? throw new ArgumentNullException(nameof(videoRepository));
    }

    public async Task<List<PublicVideoResponseDto>> GetPublicVideosAsync(int pageNumber, int pageSize)
    {
        var videos = await _videoRepository.GetPublicVideosAsync(pageNumber, pageSize);

        return videos
            .Skip((pageNumber - 1) * pageSize) 
            .Take(pageSize)
            .Select(v => new PublicVideoResponseDto
            {
                Id = v.Id,
                Title = v.Title,
                Description = v.Description,
                Hashtags = v.Hashtags,
                PrivacyLevel = v.PrivacyLevel,
                VideoUrl = v.VideoUrl,
                UserId = v.UserId,
                UserName = v.UserName,
                ViewsCount = _context.HistoryVideos.Count(h => h.VideoId == v.Id),
                LikesCount = _context.Likes.Count(l => l.VideoId == v.Id),
                TotalViewVideo = _context.HistoryVideos.Count(h => h.VideoId == v.Id) + _context.Likes.Count(l => l.VideoId == v.Id)
            })
            .ToList();
    }

    
    public async Task<List<VideoDto>> GetUserVideosAsync(int userId, bool isLoggedIn)
    {
        var videos = await _videoRepository.GetUserVideosAsync(userId);
        return videos
            .Where(v => v.PrivacyLevel == "public" || isLoggedIn)
            .Select(v => new VideoDto
            {
                Id = v.Id,
                Title = v.Title,
                Description = v.Description,
                Hashtags = v.Hashtags,
                PrivacyLevel = v.PrivacyLevel,
                VideoUrl = v.VideoUrl,
                UserId = v.UserId,
                UserName = v.User?.Username
            })
            .ToList();
    }

    public async Task<bool> UploadVideoAsync(int userId, UploadVideoRequestDto request)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
            return false;

        if (request.Video != null)
        {
            var videoUrl = await SaveFileAsync(request.Video, "videos");

            var videoDurationInSeconds = await GetVideoDurationAsync(videoUrl);

            if (request.VideoType == VideoType.Short && videoDurationInSeconds > 60)
            {
                return false;
            }

            if (request.VideoType == VideoType.Long && videoDurationInSeconds <= 60)
            {
                return false;
            }

            Category? category = null;
            if (request.CategoryId.HasValue)
            {
                category = await _categoryRepository.GetByIdAsync(request.CategoryId.Value);
                if (category == null)
                {
                    return false;
                }
            }

            var video = new Video
            {
                UserId = userId,
                Title = request.Title,
                Description = request.Description,
                Hashtags = request.Hashtags,
                PrivacyLevel = request.PrivacyLevel.ToString(),
                VideoUrl = videoUrl,
                VideoType = request.VideoType.ToString(),
                DurationInSeconds = videoDurationInSeconds,
                CategoryId = category?.Id
            };

            await _videoRepository.CreateAsync(video);
            return true;
        }

        return false;
    }


    private async Task<int> GetVideoDurationAsync(string videoPath)
    {
        var videoFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "videos", videoPath);

        if (!File.Exists(videoFilePath))
        {
            throw new FileNotFoundException("Video file not found", videoFilePath);
        }

        var inputFile = new MediaFile { Filename = videoFilePath };

        using (var engine = new MediaToolkit.Engine())
        {
            engine.GetMetadata(inputFile);
        }

        return (int)inputFile.Metadata.Duration.TotalSeconds;
    }

    public async Task<bool> UpdateVideoAsync(int videoId, int userId, UpdateVideoRequestDto request)
    {
        var video = await _videoRepository.GetVideoByIdAsync(videoId);

        if (video == null || video.UserId != userId)
            return false;

        video.Title = request.Title;
        video.Description = request.Description;
        video.Hashtags = request.Hashtags;
        video.PrivacyLevel = request.PrivacyLevel.ToString();

        return await _videoRepository.SaveChangesAsync();
    }

    public async Task<bool> DeleteVideoAsync(int videoId, int userId)
    {
        var video = await _videoRepository.GetVideoByIdAsync(videoId);

        if (video == null || video.UserId != userId)
            return false;

        return await _videoRepository.DeleteAsync(video);
    }

    private async Task<string> SaveFileAsync(IFormFile file, string folder)
    {
        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", folder);

        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
        }

        var filePath = Path.Combine(folderPath, file.FileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return file.FileName;
    }


    public async Task<List<VideoDto>> SearchVideosAsync(string keyword)
    {
        var videos = await _videoRepository.SearchVideosAsync(keyword);
        return videos.Select(v => new VideoDto
        {
            Id = v.Id,
            Title = v.Title,
            PrivacyLevel = v.PrivacyLevel,
            VideoUrl = v.VideoUrl,
            UserId = v.UserId,
            UserName = v.User.Username
        }).ToList();
    }

    public async Task<List<VideoDto>> GetTopVideosByEngagementAsync(int topCount)
    {
        return await _videoRepository.GetTopVideosWithEngagementAsync(topCount);
    }

    public async Task AddHistoryAsync(int userId, int videoId)
    {
        var video = await _videoRepository.GetVideoByIdAsync(videoId);
        if (video == null)
            throw new Exception("Video not found");

        var history = new HistoryVideo
        {
            UserId = userId,
            VideoId = videoId,
            ViewTime = DateTime.UtcNow
        };

        await _historyVideoRepository.AddHistoryAsync(history);
    }

    public async Task<List<VideoDto>> GetWatchedVideosByUserIdAsync(int userId)
    {
        var videos = await _historyVideoRepository.GetWatchedVideosByUserIdAsync(userId);

        return videos.Select(v => new VideoDto
        {
            Id = v.Id,
            Title = v.Title,
            PrivacyLevel = v.PrivacyLevel,
            VideoUrl = v.VideoUrl,
            Hashtags = v.Hashtags,
            Description = v.Description,
            ViewsCount = v.ViewsCount, 
        }).ToList();
    }


}