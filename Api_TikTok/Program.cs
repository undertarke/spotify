using Api_TikTok.Repository;
using Api_TikTok.Data;
using Api_TikTok.Service;
using Api_TikTok.Service.Impl;
using Api_TikTok.Repository.Impl;
using Api_TikTok.Chat;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Microsoft.AspNetCore.Http.Features;

var builder = WebApplication.CreateBuilder(args);

// Config DB MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 32))
    )
);

// Set max upload 100MB
builder.WebHost.UseKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 104857600; 
});

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 104857600; 
});

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false, 
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddScoped<UserService, UserServiceImpl>();
builder.Services.AddScoped<UserRepository, UserRepositoryImpl>();
builder.Services.AddScoped<VideoService, VideoServiceImpl>();
builder.Services.AddScoped<VideoRepository, VideoRepositoryImpl>();
builder.Services.AddScoped<MessageService, MessageServiceImpl>();
builder.Services.AddScoped<MessageRepository, MessageRepositoryImpl>();
builder.Services.AddScoped<FollowerService, FollowerServiceImpl>();
builder.Services.AddScoped<FollowerRepository, FollowerRepositoryImpl>();
builder.Services.AddScoped<LikeService, LikeServiceImpl>();
builder.Services.AddScoped<LikeRepository, LikeRepositoryImpl>();
builder.Services.AddScoped<CommentService, CommentServiceImpl>();
builder.Services.AddScoped<CommentRepository, CommentRepositoryImpl>();
builder.Services.AddScoped<NotificationRepository, NotificationRepositoryImpl>();
builder.Services.AddScoped<NotificationService, NotificationServiceImpl>();
builder.Services.AddScoped<BookmarkService, BookmarkServiceImpl>();
builder.Services.AddScoped<BookmarkRepository, BookmarkRepositoryImpl>();

builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API TikTok",
        Version = "v1"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your Bearer token in the format: Bearer {your_token}"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API TikTok");
    });
}

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("/chatHub");

app.Run();
