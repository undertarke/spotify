using Api_TikTok.Model;
using Api_TikTok.Repository;

namespace Api_TikTok.Service.Impl
{
    public class NotificationServiceImpl : NotificationService
    {
        private readonly NotificationRepository _notificationRepository;

        public NotificationServiceImpl(NotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task SendInteractionNotification(int userId, string message, string type)
        {
            var notification = new Notification
            {
                UserId = userId,
                Message = message,
                Type = type
            };

            await _notificationRepository.AddNotificationAsync(notification);
        }

        public async Task SendFollowNotification(int followerId, int followingId)
        {
            var message = $"{followerId} started following you.";
            var notification = new Notification
            {
                UserId = followingId,
                Message = message,
                Type = "follow"
            };

            await _notificationRepository.AddNotificationAsync(notification);
        }

        public async Task SendNewVideoNotification(int followerId, int followingId)
        {
            var message = $"{followingId} has posted a new video.";
            var notification = new Notification
            {
                UserId = followerId,
                Message = message,
                Type = "video"
            };

            await _notificationRepository.AddNotificationAsync(notification);
        }

        public async Task UpdateNotificationSettings(int userId, bool likesEnabled, bool commentsEnabled, bool followsEnabled, bool sharesEnabled)
        {
            var notifications = await _notificationRepository.GetNotificationsByUserIdAsync(userId);

            foreach (var notification in notifications)
            {
                if (notification.Type == "like" && !likesEnabled)
                {
                    notification.IsRead = true;
                }
                if (notification.Type == "comment" && !likesEnabled)
                {
                    notification.IsRead = true;
                }
                if (notification.Type == "follow" && !likesEnabled)
                {
                    notification.IsRead = true;
                }
                if (notification.Type == "message" && !likesEnabled)
                {
                    notification.IsRead = true;
                }
            }
            foreach (var notification in notifications)
            {
                await _notificationRepository.UpdateNotificationAsync(notification);
            }
        }
    }
}
