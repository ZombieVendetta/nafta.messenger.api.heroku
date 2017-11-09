using BusinessLogicLayer.DTO;
using System.Collections.Generic;

namespace BusinessLogicLayer.Interfaces
{
    public interface IChatService
    {
        ChatDTO GetChatById(int chatId);
        IEnumerable<ChatDTO> GetChats();
        IEnumerable<MessageDTO> GetMessages(int chatId);        
        IEnumerable<ChatDTO> GetChatsForSpecificUser(string userId);
        IEnumerable<ChatDTO> GetChatByUserAndFriendId(string userId, string friendId);
        IEnumerable<UserDTO> GetChatMembersByChatId(int chatId);

        void SendMessage(int chatId, string userId, string text);
        void AddNewChat(string userId, string friendId, string name);
        void AddUserToChat(string friendId, int chatId);
        void Dispose();
    }
}