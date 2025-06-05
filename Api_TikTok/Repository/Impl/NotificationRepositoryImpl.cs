using Api_TikTok.Data;
using Api_TikTok.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_TikTok.Repository.Impl
{
    public class NotificationRepositoryImpl : NotificationRepository
    {
        private readonly AppDbContext _context;

        public NotificationRepositoryImpl(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddNotificationAsync(Notification notification)
        {
            try
            {
                await _context.Notifications.AddAsync(notification);
                await SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error while adding notification", ex);
            }
        }

        public async Task<List<Notification>> GetNotificationsByUserIdAsync(int userId)
        {
            try
            {
                return await _context.Notifications
                    .Where(n => n.UserId == userId)
                    .AsNoTracking() 
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error while fetching notifications", ex);
            }
        }

        public async Task UpdateNotificationAsync(Notification notification)
        {
            try
            {
                _context.Notifications.Update(notification);
                await SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error while updating notification", ex);
            }
        }

        private async Task SaveChangesAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error while saving changes", ex);
            }
        }
    }
}
