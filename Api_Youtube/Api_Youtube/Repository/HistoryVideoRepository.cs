using Api_Youtube.Model;

namespace Api_Youtube.Repository;

public interface HistoryVideoRepository
{
    Task AddHistoryAsync(HistoryVideo historyVideo);
    Task<List<Video>> GetWatchedVideosByUserIdAsync(int userId);
}