using Api_Youtube.Dto;
using Api_Youtube.Model;

namespace Api_Youtube.Service;

public interface CategoryService
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync();
    Task<Category> GetCategoryByIdAsync(int id);
    Task CreateCategoryAsync(CategoryDto categoryDto);
    Task UpdateCategoryAsync(int id, CategoryDto categoryDto);
    Task DeleteCategoryAsync(int id);
}