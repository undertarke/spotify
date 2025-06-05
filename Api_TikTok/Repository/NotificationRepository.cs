using Api_TikTok.Model;

namespace Api_TikTok.Repository
{
    public interface NotificationRepository
    {
        Task AddNotificationAsync(Notification notification);
        Task<List<Notification>> GetNotificationsByUserIdAsync(int userId);
        Task UpdateNotificationAsync(Notification notification);
    }
}
