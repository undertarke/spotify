using Api_TikTok.Dto;
using Api_TikTok.Model;

namespace Api_TikTok.Service
{
    public interface MessageService
    {
        Task<Message?> SendMessageAsync(SendMessageDto request);
        Task<List<Message>> GetChatHistoryAsync(int userId, int chatWithUserId);
        Task<bool> DeleteMessageAsync(int messageId, int userId);

    }
}
