using System;

namespace BusinessLogicLayer.DTO
{
    public class MessageDTO
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string UserId { get; set; }
        public int ChatId { get; set; }
        public DateTime Time { get; set; }
    }
}