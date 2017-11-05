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
        public IActionResult Get(int userId, int timestamp)
        {
            var result = _dataContext.Messages
                                     .Where(m => m.UserSenderId == userId)
                                     .Where(m => m.SendTimestamp >= timestamp)
                                     .ToList();

            if (result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
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