﻿using Api_TikTok.Model;
using Api_TikTok.Data;
using Microsoft.EntityFrameworkCore;

namespace Api_TikTok.Repository.Impl
{
    public class LikeRepositoryImpl : LikeRepository  // Ensure this implements the interface
    {
        private readonly AppDbContext _context;

        public LikeRepositoryImpl(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Like> AddLikeAsync(int userId, int videoId)
        {
            var like = new Like
            {
                UserId = userId,
                VideoId = videoId
            };
            _context.Likes.Add(like);
            await _context.SaveChangesAsync();
            return like;
        }

        public async Task<Like> ToggleLikeAsync(int userId, int videoId, bool isLiked)
        {
            var like = await _context.Likes
                .FirstOrDefaultAsync(l => l.UserId == userId && l.VideoId == videoId);

            if (like == null)
            {
                if (isLiked)
                    return await AddLikeAsync(userId, videoId);
                return null;
            }

            if (!isLiked)
            {
                _context.Likes.Remove(like);
                await _context.SaveChangesAsync();
            }

            return like;
        }
    }
}
