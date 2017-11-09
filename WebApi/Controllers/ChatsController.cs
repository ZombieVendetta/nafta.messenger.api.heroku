using BusinessLogicLayer.Interfaces;
using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Web.Http;

namespace WebApi.Controllers
{
    /// <summary>Chats Controller</summary>
    [Authorize]
    [RoutePrefix("api/chats")]
    public class ChatsController : ApiController
    {
        private IChatService service;

        /// <summary>Chats Controller constructor</summary>
        public ChatsController(IChatService service)
        {
            this.service = service;
        }

        /// <summary>Get chats</summary>
        /// <remarks>Get list of all user chats</remarks>
        /// <returns></returns>
        [Route("")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                var chats = service.GetChatsForSpecificUser(User.Identity.GetUserId());
                if (chats.ToList().Count == 0)
                    throw new Exception("Not found chats");
                return Json(chats);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Get chat</summary>
        /// <remarks>Get chat by id</remarks>        
        /// <returns></returns>
        [Route("{id}")]
        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            try
            {
                var chat = service.GetChatById(id);
                if (chat == null)
                    throw new Exception("Not found chat");
                return Json(chat);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Get chat</summary>
        /// <remarks>Get chat with friend by id</remarks>        
        /// <returns></returns>
        [Route("user/{id}")]
        [HttpGet]
        public IHttpActionResult GetChaWithFriend(string id)
        {
            try
            {
                var chat = service.GetChatByUserAndFriendId(User.Identity.GetUserId(), id).FirstOrDefault();
                if (chat == null)
                    throw new Exception("Not found chats");
                return Json(chat);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Send message</summary>
        /// <remarks>Send message to chat</remarks>
        /// <returns></returns>
        [Route("{chatId}/send")]
        [HttpPost]
        public IHttpActionResult SendMessage(int chatId, [FromBody]string text)
        {
            try
            {
                service.SendMessage(chatId, User.Identity.GetUserId(), text);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Create chat</summary>
        /// <remarks>Create chat with friend</remarks>
        /// <returns></returns>        
        [Route("create/{name}")]
        [HttpPost]
        public IHttpActionResult CreateChat([FromBody]string friendId, string name)
        {
            try
            {
                service.AddNewChat(User.Identity.GetUserId(), friendId, name);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Add friend to chat</summary>
        /// <remarks>Add friend to chat</remarks>
        /// <returns></returns>
        [Route("{chatId}/member")]
        [HttpPost]
        public IHttpActionResult UserToChat([FromBody]string userId, int chatId)
        {
            try
            {
                service.AddUserToChat(userId, chatId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Get chat members</summary>
        /// <remarks>Get all chat members</remarks>
        /// <returns></returns>
        [Route("{chatId}/members")]
        [HttpGet]
        public IHttpActionResult GetChatMembers(int chatId)
        {
            try
            {
                var users = service.GetChatMembersByChatId(chatId);
                if (users.ToList().Count == 0)
                    throw new Exception("Not found users");
                return Json(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>Open chat</summary>
        /// <remarks>Open chat and get a list of messages from chat</remarks>
        /// <returns></returns>
        [Route("{chatId}/messages")]
        [HttpGet]
        public IHttpActionResult OpenChat(int chatId)
        {
            try
            {
                var messages = service.GetMessages(chatId);
                if (messages.ToList().Count == 0)
                    throw new Exception("Not found users");
                return Json(messages);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}