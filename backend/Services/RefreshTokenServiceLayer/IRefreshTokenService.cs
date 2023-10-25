using backend.Models;

namespace backend.Services.RefreshTokenServiceLayer;

public interface IRefreshTokenService
{
    Task<RefreshToken> GetByToken(string token);
    Task Create(RefreshToken refreshToken);

    Task Delete(Guid id);

    Task DeleteAll(long userId);
}