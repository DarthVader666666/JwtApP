using JwtApp.Models;
using Microsoft.EntityFrameworkCore;

namespace JwtApp.Services
{
    public class BlogsContext:DbContext
    {
        private readonly IBlogsGenerator generator;

        public BlogsContext(DbContextOptions<BlogsContext> options, IBlogsGenerator generator)
            : base(options)
        {
            this.generator = generator;
            this.Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Blog>().HasKey(x => x.Id);
            modelBuilder.Entity<Blog>().HasData(this.generator.Blogs);
        }

        public DbSet<Blog> Blogs { get; set; }
    }
}
