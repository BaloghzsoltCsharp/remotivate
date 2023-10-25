using backend.Models.Entities;
using backend.Services.TaskServiceLayer;
using backend.Services.UserServiceLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController, Route("/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<List<User>> GetAllUsers()
        {
            return await _userService.GetAllUsers();
        }

        [HttpGet("{id:long}")]
        public async Task<User?> GetUserById(long id)
        {
            return await _userService.GetUserById(id);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-user")]
        public async Task<User> CreateUser([FromBody] User user)
        {
            return await _userService.CreateUser(user);
        }

        [HttpPut]
        public async Task<User> UpdateUser(User user)
        {
            return await _userService.UpdateUser(user);
        }

        [HttpDelete("{id:long}")]
        public async Task<User> DeleteUser(long id)
        {
            return await _userService.DeleteUser(id);
        }
    }
}
