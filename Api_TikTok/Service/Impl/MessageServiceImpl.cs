using Api_TikTok.Dto;
using Api_TikTok.Model;
using Api_TikTok.Repository;

namespace Api_TikTok.Service.Impl
{
    public class MessageServiceImpl : MessageService
    {
        private readonly MessageRepository _messageRepository;

        public MessageServiceImpl(MessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        public async Task<Message?> SendMessageAsync(SendMessageDto request)
        {
            var message = new Message
            {
                SenderUserId = request.SenderUserId,
                ReceiverUserId = request.ReceiverUserId,
                Content = request.Content,
                MessageType = request.MessageType.ToString()
            };

            return await _messageRepository.CreateMessageAsync(message);
        }

        public async Task<List<Message>> GetChatHistoryAsync(int userId, int chatWithUserId)
        {
            return await _messageRepository.GetMessagesAsync(userId, chatWithUserId);
        }

        public async Task<bool> DeleteMessageAsync(int messageId, int userId)
        {
            return await _messageRepository.DeleteMessageAsync(messageId, userId);
        }
    }
}
