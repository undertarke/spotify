using Api_TikTok.Dto;

namespace Api_TikTok.Service
{
    public interface UserService
    {
        Task<List<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int id);
        Task<bool> RegisterUserAsync(RegisterDto request);
        Task<LoginDto?> LoginUserAsync(string email, string password);
        Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword);
        Task<bool> UpdateProfileAsync(int userId, UpdateProfileDto request);
        Task<List<UserDto>> SearchUsersAsync(string keyword);

    }

}
