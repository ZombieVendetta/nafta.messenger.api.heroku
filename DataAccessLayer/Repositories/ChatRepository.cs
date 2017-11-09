using DataAccessLayer.Context;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace DataAccessLayer.Repositories
{
    public class ChatRepository : IRepository<Chat, int>
    {
        private ApplicationContext db;

        public ChatRepository(ApplicationContext context)
        {
            this.db = context;
        }

        public IEnumerable<Chat> GetAll()
        {
            return db.Chats.Include(p => p.Messages).Include(p => p.Users).ToList();
        }

        public Chat Get(int id)
        {
            return GetAll().FirstOrDefault(p => p.Id.Equals(id));
        }

        public void Create(Chat chat)
        {
            db.Chats.Add(chat);
        }

        public void Update(Chat order)
        {
            db.Entry(order).State = EntityState.Modified;
        }

        public IEnumerable<Chat> Find(Func<Chat, Boolean> predicate)
        {
            return db.Chats.Where(predicate).ToList();
        }

        public void Delete(int id)
        {
            Chat order = db.Chats.Find(id);
            if (order != null)
                db.Chats.Remove(order);
        }
    }
}