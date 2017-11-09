using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Hubs
{
    [HubName("MainHub")]
    public class MainHub : Hub
    {

        private static ConcurrentDictionary<string, string> FromUsers = new ConcurrentDictionary<string, string>();         // <connectionId, userID>
        private static ConcurrentDictionary<string, string> ToUsers = new ConcurrentDictionary<string, string>();           // <userId, connectionId>
        private string userId = "";

        public override Task OnConnected()
        {
            DoConnect();
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            if (stopCalled) // Client explicitly closed the connection
            {
                string id = Context.ConnectionId;
                FromUsers.TryRemove(id, out userId);
                ToUsers.TryRemove(userId, out id);
            }
            else // Client timed out
            {
                // Do nothing here...
                // FromUsers.TryGetValue(Context.ConnectionId, out userName);            
                // Clients.AllExcept(Context.ConnectionId).broadcastMessage(new ChatMessage() { UserName = userName, Message = "I'm Offline By TimeOut"});                
            }

            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            DoConnect();
            return base.OnReconnected();
        }

        private void DoConnect()
        {
            userId = Context.Request.Headers["User-Name"];

            if (userId == null || userId.Length == 0)            
                userId = Context.QueryString["User-Name"]; // for javascript clients
            
            FromUsers.TryAdd(Context.ConnectionId, userId);
            string oldId; // for case: disconnected from Client
            ToUsers.TryRemove(userId, out oldId);
            ToUsers.TryAdd(userId, Context.ConnectionId);
        }

        public void SendChatMessage(int chatId, string sender, string receiver, string message)
        {
            FromUsers.TryGetValue(Context.ConnectionId, out userId);
            string receiver_ConnectionId;
            ToUsers.TryGetValue(receiver, out receiver_ConnectionId);

            if (receiver_ConnectionId != null && receiver_ConnectionId.Length > 0)
            {
                Clients.Client(receiver_ConnectionId).broadcastMessage(new NotificationModel(chatId, sender, receiver, message));
                Clients.All.addMessage(chatId, sender, message);
            }
            else
                Clients.Caller.addMessage(chatId, sender, message);
        }
    }
}

public class NotificationModel
{
    public NotificationModel(int chatId, string sender, string receiver, string message)
    {
        this.chatId = chatId;
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
    }

    public int chatId { get; set; }
    public string sender { get; set; }
    public string receiver { get; set; }
    public string message { get; set; }

    public string ToString()
    {
        return "Notif: chatId: " + chatId + " Sender: " + sender + " Receiver: " + receiver + " Msg: " + message;
    }
}
