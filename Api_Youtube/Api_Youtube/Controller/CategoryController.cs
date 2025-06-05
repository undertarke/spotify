using Api_Youtube.Dto;
using Api_Youtube.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api_Youtube.Controller;

[Route("api/categories")]
[ApiController]
public class CategoryController : BaseController
{
    private readonly CategoryService _categoryService;

    public CategoryController(CategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _categoryService.GetAllCategoriesAsync();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoryById(int id)
    {
        var category = await _categoryService.GetCategoryByIdAsync(id);
        if (category == null)
        {
            return NotFound();
        }

        return Ok(category);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateCategory([FromBody] CategoryDto categoryDto)
    {
        var userId = GetUserIdFromClaims();

        if (categoryDto == null)
        {
            return BadRequest();
        }

        await _categoryService.CreateCategoryAsync(categoryDto);
        return CreatedAtAction(nameof(GetCategoryById), new { id = categoryDto.Name }, categoryDto);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryDto categoryDto)
    {
        var userId = GetUserIdFromClaims();

        if (categoryDto == null || id <= 0)
        {
            return BadRequest();
        }

        await _categoryService.UpdateCategoryAsync(id, categoryDto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var userId = GetUserIdFromClaims();

        await _categoryService.DeleteCategoryAsync(id);
        return NoContent();
    }
}