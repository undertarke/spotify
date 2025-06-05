using Api_TikTok.Model;

namespace Api_TikTok.Repository
{
    public interface MessageRepository
    {
        Task<Message?> CreateMessageAsync(Message message);
        Task<List<Message>> GetMessagesAsync(int userId, int chatWithUserId);
        Task<bool> DeleteMessageAsync(int messageId, int userId);
    }
}
