using System.ComponentModel.DataAnnotations;

namespace backend.Models.Requests;

public class LoginRequest
{
    [Required]
    public string Username { get; set; }
    [Required]
    // [MinLength(5)]
    public string Password { get; set; }
}