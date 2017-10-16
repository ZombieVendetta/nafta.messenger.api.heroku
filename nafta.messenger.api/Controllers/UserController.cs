using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nafta.Messenger.Api.Repository;
using Nafta.Messenger.Api.Repository.Models;

namespace nafta.messenger.api.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly DataContext _dataContext;

        public UserController(DataContext dataContext)
        {
            _dataContext = dataContext;
            _dataContext.Database.Migrate();
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(string login, string password)
        {
            if (string.IsNullOrEmpty(login.Trim()) || string.IsNullOrEmpty(password.Trim()))
                return BadRequest();

            if (_dataContext.Users.FirstOrDefault(u => u.Login.Equals(login)) != null)
                return BadRequest();

            var user = new User
            {
                UserId = _dataContext.Users.Select(u => u.UserId).DefaultIfEmpty(0).Max() + 1,
                Login = login,
                Password = password
            };
            _dataContext.Users.Add(user);
            _dataContext.SaveChanges();

            return Ok(user);
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(string login, string password)
        {
            if (string.IsNullOrEmpty(login.Trim()) || string.IsNullOrEmpty(password.Trim()))
                return BadRequest();

            var user = _dataContext.Users
                .FirstOrDefault(u => u.Login.Equals(login) && u.Password.Equals(password));

            if (user == null)
                return Unauthorized();

            return Ok(user);
        }

        [HttpGet]
        [Route("getLogin")]
        public IActionResult GetUserLoginById(int userId)
        {
            var user = _dataContext.Users
                .FirstOrDefault(u => u.UserId == userId);

            if (user == null)
                return NotFound();

            return Ok(user.Login);
        }
    }
}