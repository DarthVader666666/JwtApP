using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using JwtApp.Models;
using JwtApp.Services;
using Microsoft.AspNetCore.Authorization;

namespace JwtApp.Controllers
{
    [EnableCors("AllowClient")]
    [ApiController]
    [Route("[controller]")]
    public class BlogsController : ControllerBase
    {
        private readonly ILogger<BlogsController> _logger;
        private readonly BlogsContext context;

        public BlogsController(ILogger<BlogsController> logger, BlogsContext context)
        {
            _logger = logger;
            this.context = context;
        }

        [HttpGet]
        [Route("/blogs")]
        [Authorize]
        public IEnumerable<Blog> GetBlogs()
        {
            var blogs = context.Blogs;
            return blogs;
        }

        [HttpGet]
        [Route("/blogs/{id:int}")]
        [Authorize]
        public ActionResult<Blog> GetBlog(int id)
        {
            var blog = context.Blogs.FirstOrDefault(x => x.Id == id);

            if (blog is null)
            {
                return NotFound();
            }

            return Ok(blog);
        }

        [HttpPost]
        [Authorize]
        [Route("/blogs")]
        public IActionResult CreateBlog(PostBlog newBlog)
        {
            if (newBlog is null)
            {
                return BadRequest();
            }

            var blog = new Blog
            {
                Title = newBlog.Title,
                Body = newBlog.Body,
                Author = newBlog.Author                
            };

            context.Blogs.Add(blog);
            context.SaveChanges();

            return Ok(blog);
        }

        [HttpDelete]
        [Authorize]
        [Route("/blogs")]
        public IActionResult DeleteBlog([FromBody] Blog blog)
        {
            if (blog == null)
            {
                return BadRequest("No such blog");
            }

            var result = context.Blogs.Remove(blog);

            if (result is null)
            { 
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Could not delete Blog.");
            }

            context.SaveChanges();

            return Ok($"Blog id={blog.Id} deleted.");
        }
    }
}
