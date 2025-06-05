using Api_Youtube.Dto;
using Api_Youtube.Dto.Request;
using Api_Youtube.Dto.Response;
using Api_Youtube.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace Api_Youtube.Controller;

[Route("api/users")]
[ApiController]
public class UserController : BaseController
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService ?? throw new ArgumentNullException(nameof(userService));
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        if (id <= 0)
            return BadRequest(new { Message = "Invalid user ID" });

        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
            return NotFound(new { Message = "User not found" });

        return Ok(user);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
    {
        if (!ModelState.IsValid || request == null)
            return BadRequest(new { Message = "Invalid registration data" });

        var isRegistered = await _userService.RegisterUserAsync(request);
        if (!isRegistered)
            return Conflict(new { Message = "User registration failed, email or username may already exist" });

        return Ok(new { Message = "User registered successfully" });
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { Message = "Email and password are required" });

        var user = await _userService.LoginUserAsync(request.Email, request.Password);
        if (user == null)
            return Unauthorized(new { Message = "Invalid credentials" });

        var response = new LoginResponseDto
        {
            Email = user.Email,
            Token = user.Token
        };

        return Ok(response);
    }


    [Authorize]
    [HttpPut("{id:int}/change-password")]
    public async Task<IActionResult> ChangePassword(int id, [FromBody] ChangePasswordRequestDto request)
    {
        if (id <= 0 || request == null)
            return BadRequest(new { Message = "Invalid request" });

        if (string.IsNullOrWhiteSpace(request.OldPassword) || string.IsNullOrWhiteSpace(request.NewPassword))
            return BadRequest(new { Message = "Both old and new passwords are required" });

        var userIdFromToken = GetUserIdFromClaims();
        if (id != userIdFromToken)
            return StatusCode(403, new { Message = "You are not authorized to change this password" });

        var result = await _userService.ChangePasswordAsync(id, request.OldPassword, request.NewPassword);
        if (!result)
            return BadRequest(new { Message = "Password change failed. Incorrect old password." });

        return Ok(new { Message = "Password changed successfully" });
    }

    [Authorize]
    [HttpPut("{id:int}/update-profile")]
    public async Task<IActionResult> UpdateProfile(int id, [FromForm] UpdateProfileRequestDto request)
    {
        if (id <= 0 || request == null)
            return BadRequest(new { Message = "Invalid request" });

        var userIdFromToken = GetUserIdFromClaims();
        if (id != userIdFromToken)
            return StatusCode(403, new { Message = "You are not authorized to update this profile" });

        var result = await _userService.UpdateProfileAsync(id, request);
        if (!result)
            return BadRequest(new { Message = "Profile update failed" });

        return Ok(new { Message = "Profile updated successfully" });
    }
}