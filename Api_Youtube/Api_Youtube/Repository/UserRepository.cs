using Api_Youtube.Dto;
using Api_Youtube.Model;

namespace Api_Youtube.Repository;

public interface UserRepository
{
    Task<List<User>> GetAllAsync();
    Task<User?> GetByIdAsync(int id);
    Task<User?> GetByEmailAsync(string email);
    Task<bool> CreateAsync(User user);
    Task<bool> UpdateAsync(User user);
    Task<List<User>> SearchUsersAsync(string keyword);
}