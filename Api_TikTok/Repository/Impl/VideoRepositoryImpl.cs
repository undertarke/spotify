using Api_TikTok.Data;
using Api_TikTok.Model;
using Microsoft.EntityFrameworkCore;

namespace Api_TikTok.Repository.Impl
{
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
            _context.Videos.Add(video);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Video>> GetPublicVideosAsync()
        {
            return await _context.Videos
                .Include(v => v.User)
                .Where(v => v.PrivacyLevel == "public")
                .ToListAsync();
        }

        public async Task<List<Video>> GetUserVideosAsync(int userId)
        {
            return await _context.Videos
                .Include(v => v.User)
                .Where(v => v.UserId == userId)
                .ToListAsync();
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
    }
}