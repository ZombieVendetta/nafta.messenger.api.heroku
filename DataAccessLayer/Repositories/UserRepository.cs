using DataAccessLayer.Context;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace DataAccessLayer.Repositories
{
    public class UserRepository : IRepository<User, string>
    {
        private ApplicationContext db;

        public UserRepository(ApplicationContext context)
        {
            this.db = context;
        }

        public IEnumerable<User> GetAll()
        {
            return db.UserProfiles.Include(p => p.Friends).Include(p => p.Chats).Include(p => p.Messages).ToList();
        }

        public User Get(string id)
        {
            return GetAll().FirstOrDefault(p => p.Id.Equals(id));
        }

        public void Create(User user)
        {
            db.UserProfiles.Add(user);
        }

        public void Update(User user)
        {
            db.Entry(user).State = EntityState.Modified;
        }

        public IEnumerable<User> Find(Func<User, Boolean> predicate)
        {
            return db.UserProfiles.Where(predicate).ToList();
        }

        public void Delete(string id)
        {
            User user = db.UserProfiles.Find(id);
            if (user != null)
                db.UserProfiles.Remove(user);
        }
    }
}