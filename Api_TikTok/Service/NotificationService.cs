namespace Api_TikTok.Service
{
    public interface NotificationService
    {
        Task SendInteractionNotification(int userId, string message, string type);
        Task SendFollowNotification(int followerId, int followingId);
        Task SendNewVideoNotification(int followerId, int followingId);
        Task UpdateNotificationSettings(int userId, bool likesEnabled, bool commentsEnabled, bool followsEnabled, bool sharesEnabled);
    }
}
