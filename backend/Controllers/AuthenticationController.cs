using System.Security.Claims;
using backend.Models.Entities;
using backend.Models.Requests;
using backend.Models.Responses;
using backend.Services.Authenticators;
using backend.Services.PasswordHashers;
using backend.Services.RefreshTokenServiceLayer;
using backend.Services.TokenValidators;
using backend.Services.UserServiceLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class AuthenticationController : Controller
{
    private readonly IUserService _userService;
    private readonly IPasswordHasher _passwordHasher;
    private readonly Authenticator _authenticator;
    private readonly RefreshTokenValidator _refreshTokenValidator;
    private readonly IRefreshTokenService _refreshTokenService;
    
    public AuthenticationController(IUserService userService, IPasswordHasher passwordHasher, Authenticator authenticator, RefreshTokenValidator refreshTokenValidator, IRefreshTokenService refreshTokenService)
    {
        _userService = userService;
        _passwordHasher = passwordHasher;
        _authenticator = authenticator;
        _refreshTokenValidator = refreshTokenValidator;
        _refreshTokenService = refreshTokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
    {
        //validate RegisterRequest data
        
        //gives back every error message associated with invalid model state
        if (!ModelState.IsValid)
        {
            BadRequestModelState();
        }
        
        if (registerRequest.password != registerRequest.ConfirmPassword)
        {
            return BadRequest(new ErrorResponse("Password does not match confirm password"));
        }
    
        var existingUserByEmail = await _userService.GetByEmail(registerRequest.Email);
        if (existingUserByEmail != null)
        {
            return Conflict(new ErrorResponse("Email already exist"));
        }
        
        var existingUserByUsername = await _userService.GetByUsername(registerRequest.Username);
        if (existingUserByUsername != null)
        {
            return Conflict(new ErrorResponse("Username already exist"));
        }

        //create user and store it
        var passwordHash = _passwordHasher.HashPassword(registerRequest.password);
        var registrationUser = new User()
        {
            FirstName = registerRequest.FirstName,
            LastName = registerRequest.LastName,
            Email = registerRequest.Email,
            Username = registerRequest.Username,
            Role = registerRequest.Role,
            PasswordHash = passwordHash
        };

        var response = await _userService.CreateUser(registrationUser);
        return Ok(response);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequestModelState();
        }

        var user = await _userService.GetByUsername(loginRequest.Username);
        if (user == null)
        {
            return Unauthorized();
        }

        var isCorrectPassword = _passwordHasher.VerifyPassword(loginRequest.Password, user.PasswordHash);
        if (!isCorrectPassword)
        {
            return Unauthorized();
        }

        var response = await _authenticator.Authenticate(user);

        // HttpContext.Response.Cookies.Append("X-Access-Token", response.AccessToken,
        //     new CookieOptions
        //     {
        //         Expires = DateTime.Now.AddMinutes(15),
        //         HttpOnly = true,
        //         Secure = true,
        //         IsEssential = true,
        //         SameSite = SameSiteMode.None
        //     });
        
        return Ok(response);
    }
    
    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequest refreshRequest)
    {
        if (!ModelState.IsValid)
        {
            Console.WriteLine("here");
            return BadRequestModelState();
        }
            
        //validate refresh token to make sure it exist in the database
        var isValidRefreshToken = _refreshTokenValidator.Validate(refreshRequest.RefreshToken);
        if (!isValidRefreshToken)
        {
            return BadRequest(new ErrorResponse("Invalid/Expired refresh token."));
        }

        var refreshTokenDTO = await _refreshTokenService.GetByToken(refreshRequest.RefreshToken);
        if (refreshTokenDTO == null)
        {
            return NotFound(new ErrorResponse("Invalid refresh token"));
        }
        
        //delete refresh token to cant be used multiple times
        await _refreshTokenService.Delete(refreshTokenDTO.Id);
        
        var user = await _userService.GetUserById(refreshTokenDTO.UserId);
        if (user == null)
        {
            return NotFound(new ErrorResponse("User not found"));
        }

        //we need to invalidate refresh tokens without changing the secret key
        //get the user for the given token to figure out who sent the refresh request
        var response = await _authenticator.Authenticate(user);
        
        Response.Cookies.Append("refjwt", response.RefreshToken, new CookieOptions
        {
            HttpOnly = true
        });
        
        //send refresh token back to the user
        return Ok(response);
    }
    
    [Authorize]
    [HttpDelete("logout")]
    public async Task<IActionResult> Logout()
    {
        //user's id that we want to invalidate refresh tokens for
        // var unparsedUserId = HttpContext.User.FindFirstValue("id");
        //
        // if (!Guid.TryParse(unparsedUserId, out Guid userId))
        // {
        //     return Unauthorized();
        // }
        //
        // //delete from db
        // await _refreshTokenService.DeleteAll(userId);
        //
        // return NoContent();
        
        Response.Cookies.Delete("jwt");

        return Ok(new
        {
            message = "success"
        });
    }
    
    //if the user doesnt provide username and password
    private IActionResult BadRequestModelState()
    {
        var errorMessages = ModelState.Values.SelectMany(v =>
            v.Errors.Select(e => e.ErrorMessage));
        
        return BadRequest(new ErrorResponse(errorMessages));
    }
}