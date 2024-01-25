namespace JwtApp.Models
{
    public record PostBlog
    {
        public string Title { get; set; }

        public string Body { get; set; }

        public string Author { get; set; }
    }
}
