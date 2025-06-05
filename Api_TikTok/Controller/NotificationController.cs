using Api_TikTok.Dto;
using Api_TikTok.Service;
using Microsoft.AspNetCore.Mvc;

namespace Api_TikTok.Controller
{
    [Route("api/notifications")]
    [ApiController]
    public class NotificationController : BaseController
    {
        private readonly NotificationService _notificationService;

        public NotificationController(NotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpPost("interaction")]
        public async Task<IActionResult> SendInteractionNotification([FromBody] InteractionNotificationDto notificationDto)
        {
            var userId = GetUserIdFromClaims();
            if (userId == 0) return Unauthorized("User not found.");

            await _notificationService.SendInteractionNotification(userId, notificationDto.Message, notificationDto.Type);
            return Ok(new { message = "Interaction notification sent successfully." });
        }

        [HttpPost("follow")]
        public async Task<IActionResult> SendFollowNotification([FromBody] FollowNotificationDto followNotificationDto)
        {
            var userId = GetUserIdFromClaims();
            if (userId == 0) return Unauthorized("User not found.");

            await _notificationService.SendFollowNotification(followNotificationDto.FollowerId, followNotificationDto.FollowingId);
            return Ok(new { message = "Follow notification sent successfully." });
        }

        [HttpPost("new-video")]
        public async Task<IActionResult> SendNewVideoNotification([FromBody] NewVideoNotificationDto videoNotificationDto)
        {
            var userId = GetUserIdFromClaims();
            if (userId == 0) return Unauthorized("User not found.");

            await _notificationService.SendNewVideoNotification(videoNotificationDto.FollowerId, videoNotificationDto.FollowingId);
            return Ok(new { message = "New video notification sent successfully." });
        }

        [HttpPut("update-notification-settings")]
        public async Task<IActionResult> UpdateNotificationSettings([FromBody] NotificationSettingsDto settingsDto)
        {
            var userId = GetUserIdFromClaims();
            if (userId == 0)
            {
                return Unauthorized();
            }

            await _notificationService.UpdateNotificationSettings(userId, settingsDto.LikesEnabled, settingsDto.CommentsEnabled, settingsDto.FollowsEnabled, settingsDto.SharesEnabled);

            return Ok(new { message = "Notification settings updated successfully." });
        }
    }
}
