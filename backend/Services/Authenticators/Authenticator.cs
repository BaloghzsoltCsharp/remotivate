using backend.Models;
using backend.Models.Entities;
using backend.Models.Responses;
using backend.Services.RefreshTokenServiceLayer;
using backend.Services.TokenGenerators;

namespace backend.Services.Authenticators;

public class Authenticator
{
    private readonly AccessTokenGenerator _accessTokenGenerator;
    private readonly RefreshTokenGenerator _refreshTokenGenerator;
    private readonly IRefreshTokenService _refreshTokenService;

    public Authenticator(AccessTokenGenerator accessTokenGenerator, IRefreshTokenService refreshTokenService, RefreshTokenGenerator refreshTokenGenerator)
    {
        _accessTokenGenerator = accessTokenGenerator;
        _refreshTokenService = refreshTokenService;
        _refreshTokenGenerator = refreshTokenGenerator;
    }
    
    public async Task<AuthenticatedUserResponse> Authenticate(User user)
    {
        //generate access tokens for user
        var accessToken = _accessTokenGenerator.GenerateToken(user);
        var refreshToken = _refreshTokenGenerator.GenerateToken();

        //store refresh token in database
        RefreshToken refreshTokenDTO = new RefreshToken()
        {
            Token = refreshToken,
            UserId = user.Id
        };

        await _refreshTokenService.Create(refreshTokenDTO);

        //give back authenticated user response
        return new AuthenticatedUserResponse()
        {
            AccessToken =  accessToken,
            RefreshToken = refreshToken
        };
    }
}