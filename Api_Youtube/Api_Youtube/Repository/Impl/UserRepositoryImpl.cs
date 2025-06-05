using Api_Youtube.Data;
using Api_Youtube.Model;
using Microsoft.EntityFrameworkCore;

namespace Api_Youtube.Repository.Impl;

public class UserRepositoryImpl : UserRepository
{
    private readonly AppDbContext _context;

    public UserRepositoryImpl(AppDbContext context)
    {
        _context = context;
    }
    public async Task<List<User>> GetAllAsync() => await _context.Users.ToListAsync();

    public async Task<User?> GetByIdAsync(int id) => await _context.Users.FindAsync(id);

    public async Task<User?> GetByEmailAsync(string email) => await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

    public async Task<bool> CreateAsync(User user)
    {
        if (await _context.Users.AnyAsync(u => u.Email == user.Email))
        {
            throw new InvalidOperationException("Email already exists in the database.");
        }

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return true;
    }
    
    public async Task<bool> UpdateAsync(User user)
    {
        _context.Users.Update(user);
        return await _context.SaveChangesAsync() > 0;
    }
    public async Task<List<User>> SearchUsersAsync(string keyword)
    {
        return await _context.Users
            .Where(u => EF.Functions.Like(u.Username, $"%{keyword}%") ||
                        EF.Functions.Like(u.Bio, $"%{keyword}%"))
            .ToListAsync();
    }
}