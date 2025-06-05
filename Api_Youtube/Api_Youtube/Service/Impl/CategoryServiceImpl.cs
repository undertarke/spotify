using Api_Youtube.Dto;
using Api_Youtube.Model;
using Api_Youtube.Repository;

namespace Api_Youtube.Service.Impl;

public class CategoryServiceImpl : CategoryService
{
    private readonly CategoryRepository _categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
    {
        return await _categoryRepository.GetAllAsync();
    }

    public async Task<Category> GetCategoryByIdAsync(int id)
    {
        return await _categoryRepository.GetByIdAsync(id);
    }

    public async Task CreateCategoryAsync(CategoryDto categoryDto)
    {
        var category = new Category
        {
            Name = categoryDto.Name
        };
        await _categoryRepository.CreateAsync(category);
    }

    public async Task UpdateCategoryAsync(int id, CategoryDto categoryDto)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category != null)
        {
            category.Name = categoryDto.Name;
            await _categoryRepository.UpdateAsync(category);
        }
    }

    public async Task DeleteCategoryAsync(int id)
    {
        await _categoryRepository.DeleteAsync(id);
    }
}