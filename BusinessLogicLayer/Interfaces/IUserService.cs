using BusinessLogicLayer.DTO;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Interfaces
{
    public interface IUserService
    {
        UserDTO GetUsersById(string userId);
        IEnumerable<UserDTO> GetAllUsers();
        IEnumerable<UserDTO> GetAllFriendsByUser(string userId);
        IEnumerable<UserDTO> GetUsersByEmail(string email);
        IEnumerable<UserDTO> GetUsersByFirstName(string name);
        IEnumerable<UserDTO> GetUsersBySurname(string surname);
        IEnumerable<UserDTO> GetUsersByBornDate(DateTime bornDate);
        IEnumerable<UserDTO> GetUsersByPhoneNumber(string phoneNumber);
        IEnumerable<UserDTO> GetUsersByRegistrationDate(DateTime registrationDate);
        string GetUserRole(string id);

        void AddUserToFriends(string UserId, string FriendId);
        void RemoveUserFromFriends(string UserId, string FriendId);

        Task<IdentityResult> ChangePassword(string id, string oldPass, string newPass);
        Task<IdentityResult> RemovePassword(string id);
        Task<IdentityResult> RemoveLogin(string id, string loginProvider, string providerKey);
        Task<IdentityResult> Register(UserDTO userDTO);
        Task<ClaimsIdentity> OAuthIdentity(string userName, string Password);
        Task<ClaimsIdentity> CookiesIdentity(string userName, string Password);
        void Dispose();
    }
}