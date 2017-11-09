using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Infrastructure;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLogicLayer.Services
{
    public class ChatService : IChatService
    {
        IUnitOfWork Database { get; set; }
        IMapper _mapper { get; set; }

        public ChatService(IUnitOfWork uow, IMapper mapper)
        {
            Database = uow;
            _mapper = mapper;
        }

        public void SendMessage(int chatId, string userId, string text)
        {
            var chat = Database.Chats.Get(chatId);
            if (chat == null)
                throw new ValidationException("Chat not found", "");
            var user = Database.Users.Get(userId);
            if (user == null)
                throw new ValidationException("User not found", "");
            if (text.Equals(""))
                throw new ValidationException("Empty message", "");

            var message = new Message
            {
                Text = text,
                UserId = userId,
                ChatId = chatId,
                Time = DateTime.Now,
            };

            Database.Messages.Create(message);
            Database.Save();
        }

        public void AddNewChat(string userId, string friendId, string chatName)
        {
            if (userId == friendId)
                throw new ValidationException("Invalid argument", "");

            var user = Database.Users.Get(userId);
            var friend = Database.Users.Get(friendId);

            if (user == null || friend == null)
                throw new ValidationException("User not found", "");
            if (chatName.Equals(""))
                throw new ValidationException("Empty chat name", "");

            if (!user.Friends.Contains(friend))
            {
                user.Friends.Add(friend);
                friend.Friends.Add(user);
            }

            var chat = new Chat
            {
                Name = chatName,
                CreationDate = DateTime.Now
            };
            user.Chats.Add(chat);
            friend.Chats.Add(chat);

            Database.Users.Update(friend);
            Database.Users.Update(user);
            Database.Save();
        }

        public void AddUserToChat(string friendId, int chatId)
        {
            var user = Database.Users.Get(friendId);
            if (user == null)
                throw new ValidationException("User not found", "");
            var chat = Database.Chats.Get(chatId);
            if (chat == null)
                throw new ValidationException("Chat not found", "");
            if (chat.Users.Contains(user))
                throw new ValidationException("User already in this chat", "");

            chat.Users.Add(user);
            Database.Chats.Update(chat);
            Database.Save();
        }

        public ChatDTO GetChatById(int chatId)
        {
            var chat = Database.Chats.Get(chatId);
            if (chat == null)
                throw new ValidationException("Chat not found", "");

            return _mapper.Map<Chat, ChatDTO>(chat);
        }

        public IEnumerable<ChatDTO> GetChats()
        {
            return _mapper.Map<IEnumerable<Chat>, List<ChatDTO>>(Database.Chats.GetAll());
        }

        public IEnumerable<ChatDTO> GetChatsForSpecificUser(string userId)
        {
            var user = Database.Users.Get(userId);
            if (user == null)
                throw new ValidationException("User not found", "");

            return _mapper.Map<IEnumerable<Chat>, List<ChatDTO>>(Database.Chats.GetAll()
                .Where(p => p.Users.Contains(user)));
        }

        public IEnumerable<ChatDTO> GetChatByUserAndFriendId(string userId, string friendId)
        {
            var user = Database.Users.Get(userId);
            var friend = Database.Users.Get(friendId);

            if (user == null || friend == null)
                throw new ValidationException("User not found", "");

            return _mapper.Map<IEnumerable<Chat>, List<ChatDTO>>(Database.Chats.GetAll()
                .Where(c => c.Users.Contains(user) && c.Users.Contains(friend)));
        }

        public IEnumerable<UserDTO> GetChatMembersByChatId(int chatId)
        {
            var chat = Database.Chats.Get(chatId);
            if (chat == null)
                throw new ValidationException("Chat not found", "");

            return _mapper.Map<IEnumerable<User>, List<UserDTO>>(Database.Users.GetAll()
                .Where(c => c.Chats.Contains(chat)));
        }

        public IEnumerable<MessageDTO> GetMessages(int chatId)
        {
            var chat = Database.Chats.Get(chatId);
            if (chat == null)
                throw new ValidationException("Chat not found", "");

            return _mapper.Map<IEnumerable<Message>, List<MessageDTO>>(Database.Messages.GetAll()
                .Where(p => p.ChatId.Equals(chatId)));
        }

        public void Dispose()
        {
            Database.Dispose();
        }
    }
}