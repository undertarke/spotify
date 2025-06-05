using Api_Youtube.Data;
using Api_Youtube.Model;
using Microsoft.EntityFrameworkCore;

namespace Api_Youtube.Repository.Impl;

public class HistoryVideoRepositoryImpl : HistoryVideoRepository
{
    private readonly AppDbContext _context;

    public HistoryVideoRepositoryImpl(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddHistoryAsync(HistoryVideo historyVideo)
    {
        await _context.HistoryVideos.AddAsync(historyVideo);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Video>> GetWatchedVideosByUserIdAsync(int userId)
    {
        return await _context.HistoryVideos
            .Where(h => h.UserId == userId)
            .Include(h => h.Video)
            .Select(h => h.Video)
            .ToListAsync();
    }
}
