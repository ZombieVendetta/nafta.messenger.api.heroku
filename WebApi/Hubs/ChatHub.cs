using Microsoft.AspNet.Identity;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace WebApi.Hubs
{
    [HubName("ChatHub")]
    public class ChatHub : Hub
    {
        private static Dictionary<string, string> dictionary = new Dictionary<string, string>();

        public void Create(string userId, string name)
        {
            Clients.Caller.addChat(name);
            var user = dictionary.Where(o => o.Key.Equals(userId));
            if (user.Any())
                Clients.Client(user.First().Value).addChat(name);
        }

        public override Task OnConnected()
        {
            var userId = HttpContext.Current.User.Identity.GetUserId();
            var connectionID = Context.ConnectionId;

            if (dictionary.Keys.Contains(userId))
                dictionary[userId] = connectionID;
            else
                dictionary.Add(userId, connectionID);
            return base.OnConnected();
        }
    }
}