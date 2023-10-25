namespace backend.Services.PasswordHashers;

public interface IPasswordHasher
{
    string HashPassword(string password);

    //compare password to passwordHash
    bool VerifyPassword(string password, string passwordHash);
}