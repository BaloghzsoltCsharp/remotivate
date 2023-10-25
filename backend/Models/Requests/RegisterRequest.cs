using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace backend.Models.Requests;

public class RegisterRequest
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Role { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    public string Username { get; set; }
    [Required]
    // [MinLength(5)]
    public string password { get; set; }
    [Required]
    public string ConfirmPassword { get; set; }
}