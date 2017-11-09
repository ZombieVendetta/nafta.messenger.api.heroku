using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Infrastructure;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services
{
    public class UserService : IUserService
    {
        IUnitOfWork Database { get; set; }
        IMapper _mapper { get; set; }

        public UserService(IUnitOfWork uow, IMapper mapper)
        {
            Database = uow;
            _mapper = mapper;
        }

        #region operationWithFriends
        public void AddUserToFriends(string userId, string friendId)
        {
            var user = Database.Users.Get(userId);
            var friend = Database.Users.Get(friendId);
            if (user == null || friend == null)
                throw new ValidationException("User not found", "");
            if (user.Friends.Contains(friend))
                throw new ValidationException("Users are already friends", "");

            user.Friends.Add(friend);
            friend.Friends.Add(user);
            Database.Users.Update(user);
            Database.Users.Update(friend);
            Database.Save();
        }

        public void RemoveUserFromFriends(string userId, string friendId)
        {
            var user = Database.Users.Get(userId);
            var friend = Database.Users.Get(friendId);
            var chat = user.Chats.Where(c => c.Users.Contains(friend) & c.Users.Count < 3).FirstOrDefault();
            if (user == null || friend == null)
                throw new ValidationException("User not found", "");
            if (!user.Friends.Contains(friend))
                throw new ValidationException("Users are not friends", "");
            if (chat != null)
            {
                user.Chats.Remove(chat);
                friend.Chats.Remove(chat);
                Database.Chats.Delete(chat.Id);
            }
            user.Friends.Remove(friend);
            friend.Friends.Remove(user);

            Database.Users.Update(user);
            Database.Users.Update(friend);
            Database.Save();
        }
        #endregion

        #region search
        public UserDTO GetUsersById(string userId)
        {
            var user = Database.Users.Get(userId);
            if (user == null)
                throw new ValidationException("User not found", "");

            return _mapper.Map<User, UserDTO>(user);
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return _mapper.Map<IEnumerable<User>, List<UserDTO>>(Database.Users.GetAll());
        }

        public IEnumerable<UserDTO> GetAllFriendsByUser(string userId)
        {
            var user = Database.Users.Get(userId);
            if (user == null)
                throw new ValidationException("User not found", "");

            return _mapper.Map<IEnumerable<User>, List<UserDTO>>(Database.Users.GetAll()
                .Where(p => p.Friends.Contains(user)));
        }

        public IEnumerable<UserDTO> GetUsersByEmail(string email)
        {
            return _mapper.Map<IEnumerable<User>, List<UserDTO>>(Database.Users.GetAll()
                .Where(p => p.Email.StartsWith(email)));
        }

        public IEnumerable<UserDTO> GetUsersByFirstName(string name)
        {
            return _mapper.Map<IEnumerable<User>, List<UserDTO>>(Database.Users.GetAll()
                .Where(p => p.Name.StartsWith(name)));
        }

        public IEnumerable<UserDTO> GetUsersBySurname(string surname)
        {
            return _mapper.Map<IEnumerable<User>, List<UserDTO>>(Database.Users.GetAll()
                .Where(p => p.Surname.StartsWith(surname)));
        }

        public IEnumerable<UserDTO> GetUsersByPhoneNumber(string phoneNumber)
        {
            return _mapper.Map<IEnumerable<User>, List<UserDTO>>(Database.Users.GetAll()
                .Where(p => p.PhoneNumber.StartsWith(phoneNumber)));
        }

        public IEnumerable<UserDTO> GetUsersByBornDate(DateTime bornDate)
        {
            return _mapper.Map<IEnumerable<User>, List<UserDTO>>(Database.Users.GetAll()
                .Where(p => p.BornDate.Equals(bornDate)));
        }

        public IEnumerable<UserDTO> GetUsersByRegistrationDate(DateTime registrationDate)
        {
            return _mapper.Map<IEnumerable<User>, List<UserDTO>>(Database.Users.GetAll()
                .Where(p => p.RegistrationDate.Equals(registrationDate)));
        }

        public string GetUserRole(string id)
        {
            return Database.UserManager.GetRoles(id).FirstOrDefault();
        }
        #endregion

        #region identity
        public async Task<IdentityResult> ChangePassword(string id, string oldPass, string newPass)
        {
            return await Database.UserManager.ChangePasswordAsync(id, oldPass, newPass);
        }

        public async Task<IdentityResult> RemovePassword(string id)
        {
            return await Database.UserManager.RemovePasswordAsync(id);
        }

        public async Task<IdentityResult> RemoveLogin(string id, string loginProvider, string providerKey)
        {
            return await Database.UserManager.RemoveLoginAsync(id, new UserLoginInfo(loginProvider, providerKey));
        }

        public async Task<IdentityResult> Register(UserDTO userDTO)
        {
            var user = await Database.UserManager.FindByEmailAsync(userDTO.Email);
            if (user == null)
            {
                user = new ApplicationUser { Email = userDTO.Email, UserName = userDTO.Email };
                var result = await Database.UserManager.CreateAsync(user, userDTO.Password);
                if (result.Errors.Count() > 0)
                    return IdentityResult.Failed(result.Errors.FirstOrDefault());
                // Add a role
                var role = await Database.RoleManager.FindByNameAsync(userDTO.Role);
                if (role == null)
                {
                    role = new ApplicationRole { Name = userDTO.Role };
                    await Database.RoleManager.CreateAsync(role);
                }
                await Database.UserManager.AddToRoleAsync(user.Id, userDTO.Role);
                // create client profile
                var userProfile = new User
                {
                    Id = user.Id,
                    Name = userDTO.Name,
                    Surname = userDTO.Surname,
                    Email = userDTO.Email,
                    Sex = userDTO.Sex,
                    BornDate = userDTO.BornDate,
                    PhoneNumber = userDTO.PhoneNumber,
                    RegistrationDate = userDTO.RegistrationDate
                };

                Database.Users.Create(userProfile);
                await Database.SaveAsync();
                return IdentityResult.Success;
            }
            else
                return IdentityResult.Failed("User with such login already exists");
        }

        public async Task<ClaimsIdentity> OAuthIdentity(string userName, string password)
        {
            var user = await Database.UserManager.FindAsync(userName, password);
            if (user == null)
                throw new ValidationException("The user name or password is incorrect", "");

            return await user.GenerateUserIdentityAsync(Database.UserManager, OAuthDefaults.AuthenticationType);
        }

        public async Task<ClaimsIdentity> CookiesIdentity(string userName, string password)
        {
            var user = await Database.UserManager.FindAsync(userName, password);
            if (user == null)
                throw new ValidationException("The user name or password is incorrect", "");

            return await user.GenerateUserIdentityAsync(Database.UserManager, CookieAuthenticationDefaults.AuthenticationType);
        }
        #endregion

        public void Dispose()
        {
            Database.Dispose();
        }
    }
}