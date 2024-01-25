using Bogus;
using JwtApp.Models;

namespace JwtApp.Services
{
    public class BlogsGenerator : IBlogsGenerator
    {
        public BlogsGenerator()
        {
            Blogs = GenerateBlogs(5);
        }

        public IEnumerable<Blog> Blogs { get; set; }

        public IEnumerable<Blog> GenerateBlogs(int count)
        {
            var id = 1;

            var faker = new Faker<Blog>()
                .RuleFor(x => x.Id, f => id++)
                .RuleFor(x => x.Author, f => f.Name.FullName())
                .RuleFor(x => x.Title, f => f.Lorem.Sentence(2, 3))
                .RuleFor(x => x.Body, f => f.Lorem.Paragraph())
                .Generate(5);

            return faker;
        }
    }
}
