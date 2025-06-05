using Api_TikTok.Model;

namespace Api_TikTok.Repository
{
    public interface UserRepository
    {
        Task<List<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task<User?> GetByEmailAsync(string email);
        Task<bool> CreateAsync(User user);
        Task<bool> UpdateAsync(User user);
        Task<List<User>> SearchUsersAsync(string keyword);

    }
}
