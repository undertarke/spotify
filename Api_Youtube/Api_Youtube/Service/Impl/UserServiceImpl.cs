using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api_Youtube.Dto;
using Api_Youtube.Dto.Request;
using Api_Youtube.Dto.Response;
using Api_Youtube.Model;
using Api_Youtube.Repository;
using Microsoft.IdentityModel.Tokens;

namespace Api_Youtube.Service.Impl;

public class UserServiceImpl : UserService
{
    private readonly UserRepository _userRepository;
    private readonly IConfiguration _configuration;


    public UserServiceImpl(UserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    public async Task<List<UserDto>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllAsync();
        return users.Select(u => new UserDto
        {
            Id = u.Id,
            Username = u.Username,
        }).ToList();
    }

    public async Task<UserDto?> GetUserByIdAsync(int id)
    {
        if (id <= 0) return null;

        var user = await _userRepository.GetByIdAsync(id);
        return user == null
            ? null
            : new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Avatar = user.Avatar,
                Bio = user.Bio,
            };
    }

    public async Task<bool> RegisterUserAsync(RegisterRequestDto request)
    {
        var existingUser = await _userRepository.GetByEmailAsync(request.Email);
        if (existingUser != null)
        {
            throw new Exception("Email already exists");
        }

        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        return await _userRepository.CreateAsync(user);
    }

    public async Task<LoginResponseDto?> LoginUserAsync(string email, string password)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            return null;

        var user = await _userRepository.GetByEmailAsync(email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            return null;

        var tokenString = GenerateJwtToken(user);

        return new LoginResponseDto
        {
            Email = user.Email,
            Token = tokenString
        };
    }

    public async Task<List<UserDto>> SearchUsersAsync(string keyword)
    {
        var users = await _userRepository.SearchUsersAsync(keyword);
        return users.Select(u => new UserDto
        {
            Id = u.Id,
            Username = u.Username,
            Avatar = u.Avatar,
            Bio = u.Bio
        }).ToList();
    }

    public async Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword)
    {
        if (string.IsNullOrWhiteSpace(oldPassword) || string.IsNullOrWhiteSpace(newPassword))
            return false;

        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null || !BCrypt.Net.BCrypt.Verify(oldPassword, user.Password))
            return false;

        user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
        return await _userRepository.UpdateAsync(user);
    }

    public async Task<bool> UpdateProfileAsync(int userId, UpdateProfileRequestDto request)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
            return false;

        if (!string.IsNullOrWhiteSpace(request.Username))
            user.Username = request.Username;

        if (!string.IsNullOrWhiteSpace(request.Bio))
            user.Bio = request.Bio;

        if (request.Avatar != null)
        {
            var avatarUrl = await SaveFileAsync(request.Avatar, "avatars");
            user.Avatar = avatarUrl;
        }

        return await _userRepository.UpdateAsync(user);
    }

    private async Task<string> SaveFileAsync(IFormFile file, string folderName)
    {
        var uploadsFolder = Path.Combine("wwwroot", folderName);
        Directory.CreateDirectory(uploadsFolder);

        var uniqueFileName =
            $"{Path.GetFileNameWithoutExtension(file.FileName)}_{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(fileStream);
        }

        return $"/{folderName}/{uniqueFileName}";
    }

    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Username)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            )
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}