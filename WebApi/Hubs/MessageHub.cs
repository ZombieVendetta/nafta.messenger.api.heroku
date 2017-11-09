using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace WebApi.Hubs
{
    [HubName("MessageHub")]
    public class MessageHub : Hub
    {
        public void Send(int chatId, string name, string message)
        {
            Clients.All.addMessage(chatId, name, message);
        }
    }
}