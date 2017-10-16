using System;

namespace Nafta.Messenger.Api.Repository.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public int UserSenderId { get; set; }
        public int UserReceiverId { get; set; }

        public string TextContent { get; set; }
        public int SendTimestamp { get; set; }
    }
}
