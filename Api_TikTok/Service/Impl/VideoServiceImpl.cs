using Api_TikTok.Data;
using Api_TikTok.Dto;
using Api_TikTok.Model;
using Api_TikTok.Repository;

namespace Api_TikTok.Service.Impl
{
    public class VideoServiceImpl : VideoService
    {
        private readonly VideoRepository _videoRepository;
        private readonly UserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public VideoServiceImpl(VideoRepository videoRepository, IConfiguration configuration, UserRepository userRepository)
        {
            _userRepository = userRepository;
            _videoRepository = videoRepository ?? throw new ArgumentNullException(nameof(videoRepository));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<List<VideoDto>> GetPublicVideosAsync()
        {
            var videos = await _videoRepository.GetPublicVideosAsync();
            return videos.Select(v => new VideoDto
            {
                Id = v.Id,
                Title = v.Title,
                Description = v.Description,
                Hashtags = v.Hashtags,
                PrivacyLevel = v.PrivacyLevel,
                VideoUrl = v.VideoUrl,
                UserId = v.UserId,
                UserName = v.User?.Username
            }).ToList();
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

        public async Task<bool> UploadVideoAsync(int userId, UploadVideoDto request)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return false;

            if (request.Video != null)
            {
                var videoUrl = await SaveFileAsync(request.Video, "videos");

                var video = new Video
                {
                    UserId = userId,
                    Title = request.Title,
                    Description = request.Description,
                    Hashtags = request.Hashtags,
                    PrivacyLevel = request.PrivacyLevel.ToString(),
                    VideoUrl = videoUrl
                };

                await _videoRepository.CreateAsync(video);
                return true;
            }

            return false;
        }

        public async Task<bool> UpdateVideoAsync(int videoId, int userId, UpdateVideoDto request)
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

        private async Task<string> SaveFileAsync(IFormFile file, string folderName)
        {
            var uploadsFolder = Path.Combine("wwwroot", folderName);
            Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = $"{Path.GetFileNameWithoutExtension(file.FileName)}_{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return $"/{folderName}/{uniqueFileName}";
        }
        public async Task<List<VideoDto>> SearchVideosAsync(string keyword)
        {
            var videos = await _videoRepository.SearchVideosAsync(keyword);
            return videos.Select(v => new VideoDto
            {
                Id = v.Id,
                Title = v.Title,
                Description = v.Description,
                Hashtags = v.Hashtags,
                PrivacyLevel = v.PrivacyLevel,
                VideoUrl = v.VideoUrl,
                UserId = v.UserId,
                UserName = v.User.Username
            }).ToList();
        }


    }
}