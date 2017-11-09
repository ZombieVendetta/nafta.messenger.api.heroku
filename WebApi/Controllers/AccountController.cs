using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Controllers
{
    /// <summary>Account Controller</summary>
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private IUserService userService;
        private const string LocalLoginProvider = "Local";

        /// <summary>Account Controller constructor</summary>        
        public AccountController(IUserService userService)
        {
            this.userService = userService;
        }

        /// <summary>Token</summary>
        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

        /// <summary>Change password</summary>
        /// <remarks>Change user password</remarks>
        /// <returns></returns>
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)            
                return BadRequest(ModelState);
            
            var result = await userService.ChangePassword
                (User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

            if (!result.Succeeded)            
                return GetErrorResult(result);            

            return Ok();
        }

        /// <summary>Get user info</summary>
        /// <remarks>Get information about user</remarks>
        /// <returns></returns>        
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("UserInfo")]
        public UserInfoViewModel GetUserInfo()
        {
            var externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);
            var email = User.Identity.GetUserName();
            if (!EmailUtil.IsValid(email) && EmailUtil.IsValid(externalLogin.Email))
                email = externalLogin.Email;

            return new UserInfoViewModel
            {
                Email = email,
                HasRegistered = externalLogin == null,
                //LoginProvider = externalLogin != null ? externalLogin.LoginProvider : null
                LoginProvider = externalLogin?.LoginProvider
            };
        }

        /// <summary>Logout</summary>
        /// <remarks>User logout</remarks>
        /// <returns></returns>        
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return Ok();
        }

        /// <summary>Register</summary>
        /// <remarks>User registration</remarks>        
        /// <returns></returns>        
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(RegisterModel model)
        {
            if (!ModelState.IsValid)            
                return BadRequest(ModelState);

            var userDTO = new UserDTO()
            {
                UserName = model.Email,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                Password = model.Password,
                Sex = model.Sex,
                Name = model.Name,
                Surname = model.Surname,
                BornDate = model.BornDate,
                RegistrationDate = DateTime.Now,
                Role = "user"
            };

            var result = await userService.Register(userDTO);

            if (!result.Succeeded)            
                return GetErrorResult(result);            

            return Ok();
        }

        /// <summary>Remove login</summary>
        /// <remarks>Remove login</remarks>        
        /// <returns></returns>        
        [Route("RemoveLogin")]
        public async Task<IHttpActionResult> RemoveLogin(RemoveLoginBindingModel model)
        {
            if (!ModelState.IsValid)            
                return BadRequest(ModelState);            

            IdentityResult result;

            if (model.LoginProvider == LocalLoginProvider)            
                result = await userService.RemovePassword(User.Identity.GetUserId());            
            else            
                result = await userService.RemoveLogin(User.Identity.GetUserId(), model.LoginProvider, model.ProviderKey);

            if (!result.Succeeded)            
                return GetErrorResult(result);            

            return Ok();
        }
        
        #region Helpers

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)            
                return InternalServerError();            

            if (!result.Succeeded)
            {
                if (result.Errors != null)                
                    foreach (string error in result.Errors)                    
                        ModelState.AddModelError("", error);
                    
                
                if (ModelState.IsValid)                
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                
                return BadRequest(ModelState);
            }
            return null;
        }

        private static class RandomOAuthStateGenerator
        {
            private static RandomNumberGenerator _random = new RNGCryptoServiceProvider();

            public static string Generate(int strengthInBits)
            {
                const int bitsPerByte = 8;

                if (strengthInBits % bitsPerByte != 0)                
                    throw new ArgumentException("strengthInBits must be evenly divisible by 8.", "strengthInBits");
                
                var strengthInBytes = strengthInBits / bitsPerByte;

                var data = new byte[strengthInBytes];
                _random.GetBytes(data);
                return HttpServerUtility.UrlTokenEncode(data);
            }
        }

        private class ExternalLoginData
        {
            public string Email { get; set; }
            public string LoginProvider { get; set; }
            public string ProviderKey { get; set; }
            public string UserName { get; set; }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)                
                    return null;                

                var providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer)
                    || String.IsNullOrEmpty(providerKeyClaim.Value))                
                    return null;                

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)                
                    return null;
                
                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name),
                    Email = identity.FindFirstValue(ClaimTypes.Email)
                };
            }

            public IList<Claim> GetClaims()
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider)
                };

                if (UserName != null)                
                    claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
                
                if (Email != null)                
                    claims.Add(new Claim(ClaimTypes.Email, Email, null, LoginProvider));
                
                return claims;
            }
        }
        #endregion Helpers
    }
}