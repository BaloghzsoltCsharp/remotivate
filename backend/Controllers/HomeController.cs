using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class HomeController : Controller
{
    // GET
    [Authorize]
    [HttpGet("data")]
    public IActionResult Index()
    {
        //find first value with id clameType
        string id = HttpContext.User.FindFirstValue("id");
        string email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
        string username = HttpContext.User.FindFirstValue(ClaimTypes.Name);
        
        return Ok();
    }
}