using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Nafta.Messenger.Api.Repository;
using Nafta.Messenger.Api.Repository.Models;

namespace Nafta.Messenger.Api.Controllers
{
    [Route("api/[controller]")]
    public class MessagesController : Controller
    {
        private readonly DataContext _dataContext;

        public MessagesController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public Message Get(int userId, int timestamp)
        {
            return _dataContext.Messages
                .Where(m => m.UserReceiverId == userId)
                .FirstOrDefault(m => m.SendTimestamp >= timestamp);
        }

        [HttpPost]
        public void Post([FromBody] Message message)
        {
            if (message == null)
            {
                return;
            }

            _dataContext.Messages.Add(message);
            _dataContext.SaveChanges();
        }
    }
}