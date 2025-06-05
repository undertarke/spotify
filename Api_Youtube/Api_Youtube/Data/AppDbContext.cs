using Microsoft.EntityFrameworkCore;
using Api_Youtube.Model;

namespace Api_Youtube.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<HistoryVideo> HistoryVideos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Follower> Followers { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(u => u.Email).IsRequired();
                entity.HasIndex(u => u.Email).IsUnique();
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd(); 
            });

            modelBuilder.Entity<Video>(entity =>
            {
                entity.HasOne(v => v.User)
                      .WithMany(u => u.Videos)
                      .HasForeignKey(v => v.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.ToTable(tb =>
                {
                    tb.HasCheckConstraint("chk_video_type", "video_type IN ('short', 'long')");
                });
                entity.HasOne(v => v.Category)
                    .WithMany(c => c.Videos)
                    .HasForeignKey(v => v.CategoryId);
            });

            modelBuilder.Entity<Follower>(entity =>
            {
                entity.HasKey(f => f.Id);

                entity.HasIndex(f => new { f.FollowerUserId, f.FollowingUserId })
                      .IsUnique();

                entity.HasOne(f => f.FollowingUser)
                      .WithMany(u => u.Followers)
                      .HasForeignKey(f => f.FollowingUserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(f => f.FollowerUser)
                      .WithMany(u => u.Following)
                      .HasForeignKey(f => f.FollowerUserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<HistoryVideo>(entity =>
            {
                entity.Property(hv => hv.ViewTime)
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasOne(c => c.User)
                      .WithMany(u => u.Comments)
                      .HasForeignKey(c => c.UserId);

                entity.HasOne(c => c.Video)
                      .WithMany(v => v.Comments)
                      .HasForeignKey(c => c.VideoId);
            });

            modelBuilder.Entity<Like>(entity =>
            {
                entity.HasOne(l => l.User)
                      .WithMany(u => u.Likes)
                      .HasForeignKey(l => l.UserId);

                entity.HasOne(l => l.Video)
                      .WithMany(v => v.Likes)
                      .HasForeignKey(l => l.VideoId);
            });

            modelBuilder.Entity<Bookmark>(entity =>
            {
                entity.HasOne(b => b.User)
                    .WithMany(u => u.Bookmarks)
                    .HasForeignKey(b => b.UserId);

                entity.HasOne(b => b.Video)
                    .WithMany(v => v.Bookmarks)
                    .HasForeignKey(b => b.VideoId);
            });
        }
    }
}
