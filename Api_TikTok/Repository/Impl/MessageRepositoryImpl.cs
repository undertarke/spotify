using Api_TikTok.Data;
using Api_TikTok.Model;
using Microsoft.EntityFrameworkCore;

namespace Api_TikTok.Repository.Impl
{
    public class MessageRepositoryImpl : MessageRepository
    {
        private readonly AppDbContext _context;

        public MessageRepositoryImpl(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Message?> CreateMessageAsync(Message message)
        {
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
            return message;
        }

        public async Task<List<Message>> GetMessagesAsync(int userId, int chatWithUserId)
        {
            return await _context.Messages
                .Where(m =>
                    (m.SenderUserId == userId && m.ReceiverUserId == chatWithUserId) ||
                    (m.SenderUserId == chatWithUserId && m.ReceiverUserId == userId))
                .OrderBy(m => m.Id)
                .ToListAsync();
        }

        public async Task<bool> DeleteMessageAsync(int messageId, int userId)
        {
            var message = await _context.Messages
                .Where(m => m.Id == messageId && m.SenderUserId == userId)
                .FirstOrDefaultAsync();

            if (message == null) return false;

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
