using DataAccessLayer.Context;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace DataAccessLayer.Repositories
{
    public class MessageRepository : IRepository<Message, int>
    {
        private ApplicationContext db;

        public MessageRepository(ApplicationContext context)
        {
            this.db = context;
        }

        public IEnumerable<Message> GetAll()
        {
            return db.Messages.ToList();
        }

        public Message Get(int id)
        {
            return db.Messages.Find(id);
        }

        public void Create(Message msg)
        {
            db.Messages.Add(msg);
        }

        public void Update(Message msg)
        {
            db.Entry(msg).State = EntityState.Modified;
        }

        public IEnumerable<Message> Find(Func<Message, Boolean> predicate)
        {
            return db.Messages.Where(predicate).ToList();
        }

        public void Delete(int id)
        {
            Message msg = db.Messages.Find(id);
            if (msg != null)
                db.Messages.Remove(msg);
        }
    }
}