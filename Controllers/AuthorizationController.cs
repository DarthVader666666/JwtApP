using JwtApp.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace JwtApp.Controllers
{
    [EnableCors("AllowClient")]
    [ApiController]
    [Route("[controller]")]
    public class AuthorizationController:ControllerBase
    {
        private readonly IAuthorizer _authorizer;

        public AuthorizationController(IAuthorizer authorizer)
        {
            _authorizer = authorizer;
        }

        [Route("/login/{name}")]
        public IActionResult LogIn([FromRoute] string name)
        {
            var token = _authorizer.GenerateToken(name);

            return Ok(new { access_token = token, user_name = name });
        }
    }
}
