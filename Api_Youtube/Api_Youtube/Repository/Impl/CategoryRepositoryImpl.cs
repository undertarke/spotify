using Api_Youtube.Data;
using Api_Youtube.Model;
using Microsoft.EntityFrameworkCore;

namespace Api_Youtube.Repository.Impl;

public class CategoryRepositoryImpl : CategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepositoryImpl(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Category> GetByIdAsync(int id)
    {
        return await _context.Categories.FindAsync(id);
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await _context.Categories
            .Select(category => new Category
            {
                Id = category.Id,
                Name = category.Name
            })
            .ToListAsync();
    }

    public async Task CreateAsync(Category category)
    {
        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Category category)
    {
        _context.Categories.Update(category);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category != null)
        {
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }
    }

}