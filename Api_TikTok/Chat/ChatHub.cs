using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Api_TikTok.Chat
{
    [Authorize]
    public class ChatHub : Hub
    {
        public async Task SendMessage(string content, int receiverId)
        {
            var senderId = Context.User?.FindFirst("id")?.Value;
            if (senderId == null)
                throw new HubException("Unauthorized");
            await Clients.User(receiverId.ToString()).SendAsync("ReceiveMessage", senderId, content);
        }

        public override async Task OnConnectedAsync()
        {
            var userId = Context.User.FindFirst("id")?.Value;
            if (userId != null)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, userId);
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userId = Context.User.FindFirst("id")?.Value;
            if (userId != null)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, userId);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
