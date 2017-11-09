using BusinessLogicLayer.Interfaces;
using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Web.Http;

namespace WebApi.Controllers
{
    /// <summary>Users Controller</summary>
    [Authorize]
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private IUserService userService;

        /// <summary>Users Controller constructor</summary>        
        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        /// <summary>Get all users</summary>
        /// <remarks>Get a list of all users</remarks>
        /// <returns></returns>
        [Route("")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                var users = userService.GetAllUsers();
                if (users.ToList().Count == 0)
                    throw new Exception("Not found users");

                return Json(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Get user</summary>
        /// <remarks>Get user by id</remarks>
        /// <returns></returns>
        [Route("{id}")]
        [HttpGet]
        public IHttpActionResult Get(string id)
        {
            try
            {
                var user = userService.GetUsersById(id);
                if (user == null)
                    throw new Exception("Not found user");

                return Json(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Get role</summary>
        /// <remarks>Get the role of the current authorized user/remarks>
        /// <returns></returns> 
        [Route("role")]
        [HttpGet]
        public IHttpActionResult Role()
        {
            try
            {
                return Json(userService.GetUserRole(User.Identity.GetUserId()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Get current user</summary>
        /// <remarks>Get current authorized user</remarks>
        /// <returns></returns>                
        [Route("current")]
        [HttpGet]
        public IHttpActionResult CurrentUser()
        {
            try
            {
                return Json(userService.GetUsersById(User.Identity.GetUserId()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Get friends</summary>
        /// <remarks>Get a list of all user friends</remarks>
        /// <returns></returns>
        [Route("~/api/friends")]
        [HttpGet]
        public IHttpActionResult Friends()
        {
            try
            {
                var users = userService.GetAllFriendsByUser(User.Identity.GetUserId());
                if (users.ToList().Count == 0)
                    throw new Exception("Not found users");

                return Json(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Get user by login(email)</summary>        
        /// <remarks>Get user by login(email)</remarks>
        /// <returns></returns>
        [Route("login/{login}")]
        [HttpGet]
        public IHttpActionResult ByLogin(string login)
        {
            try
            {
                var users = userService.GetUsersByEmail(login);
                if (users.ToList().Count == 0)
                    throw new Exception("Not found users");

                return Json(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Get user by name</summary>        
        /// <remarks>Get a list of all users with specified name</remarks>
        /// <returns></returns>
        [Route("name/{firstName}")]
        [HttpGet]
        public IHttpActionResult ByFirstName(string firstName)
        {
            try
            {
                var users = userService.GetUsersByFirstName(firstName);
                if (users.ToList().Count == 0)
                    throw new Exception("Not found users");

                return Json(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Get user by surname</summary>        
        /// <remarks>Get a list of all users with specified surname</remarks>
        /// <returns></returns>
        [Route("surname/{surname}")]
        [HttpGet]
        public IHttpActionResult BySurname(string surname)
        {
            try
            {
                var users = userService.GetUsersBySurname(surname);
                if (users.ToList().Count == 0)
                    throw new Exception("Not found users");

                return Json(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Get user by phone number</summary>        
        /// <remarks>Get a list of all users with specified phone number</remarks>
        /// <returns></returns>
        [Route("phone/{phoneNumber}")]
        [HttpGet]
        public IHttpActionResult ByPhoneNumber(string phoneNumber)
        {
            try
            {
                var users = userService.GetUsersByPhoneNumber(phoneNumber);
                if (users.ToList().Count == 0)
                    throw new Exception("Not found users");
                return Json(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Add friends</summary>
        /// <remarks>Add user to friends</remarks>
        /// <returns></returns>
        [Route("~/api/friends/{userId}")]
        [HttpPost]
        public IHttpActionResult AddFriends(string userId)
        {
            try
            {
                userService.AddUserToFriends(User.Identity.GetUserId(), userId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Remove friends</summary>
        /// <remarks>Remove user from friends</remarks>
        /// <returns></returns>
        [Route("~/api/friends/{friendId}")]
        [HttpDelete]
        public IHttpActionResult Friends(string friendId)
        {
            try
            {
                userService.RemoveUserFromFriends(User.Identity.GetUserId(), friendId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}