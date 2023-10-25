using backend.Models.Entities;

namespace backend.Services.UserServiceLayer
{
    public interface IUserService
    {
        Task<List<User>> GetAllUsers();
        Task<User> UpdateUser(User user);
        Task<User> DeleteUser(long id);
        
        Task<User> CreateUser(User user);
        Task<User> GetByEmail(string email);
        Task<User> GetByUsername(string username);
        Task<User?> GetUserById(long id);
   
        
    }
}
