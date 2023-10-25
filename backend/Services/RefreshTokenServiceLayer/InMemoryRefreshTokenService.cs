using backend.Models;

namespace backend.Services.RefreshTokenServiceLayer;

public class InMemoryRefreshTokenService : IRefreshTokenService
{
    private readonly List<RefreshToken> _refreshTokens = new List<RefreshToken>();
    
    public Task Create(RefreshToken refreshToken)
    {
        refreshToken.Id = Guid.NewGuid();
        
        _refreshTokens.Add(refreshToken);
        
        return Task.CompletedTask;
    }

    public Task Delete(Guid id)
    {
        _refreshTokens.RemoveAll(r => r.Id == id);
        
        return Task.CompletedTask;
    }

    public Task DeleteAll(long userId)
    {
        _refreshTokens.RemoveAll(r => r.UserId == userId);
        
        return Task.CompletedTask;
    }

    public Task<RefreshToken> GetByToken(string token)
    {
        var refreshToken = _refreshTokens.FirstOrDefault(r => r.Token == token);

        return Task.FromResult(refreshToken);
    }
    
}
