namespace JwtApp.Services
{
    public interface IAuthorizer
    {
        string GenerateToken(string username);
    }
}
