using JwtApp.Models;

namespace JwtApp.Services
{
    public interface IBlogsGenerator
    {
        IEnumerable<Blog> Blogs { get; set; }
        IEnumerable<Blog> GenerateBlogs(int count = 5);
    }
}
