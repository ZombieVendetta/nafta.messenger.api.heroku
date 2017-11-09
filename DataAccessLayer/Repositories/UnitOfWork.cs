using DataAccessLayer.Context;
using DataAccessLayer.Entities;
using DataAccessLayer.Identity;
using DataAccessLayer.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationContext db;
        private IRepository<Chat, int> chatRepository;
        private IRepository<Message, int> messageRepository;
        private IRepository<User, string> userRepository;

        private ApplicationUserManager userManager;
        private ApplicationRoleManager roleManager;

        public UnitOfWork(string connectionString)
        {
            db = new ApplicationContext(connectionString);
        }

        public IRepository<Chat, int> Chats
        {
            get
            {
                if (chatRepository == null)
                    chatRepository = new ChatRepository(db);
                return chatRepository;
            }
        }

        public IRepository<Message, int> Messages
        {
            get
            {
                if (messageRepository == null)
                    messageRepository = new MessageRepository(db);
                return messageRepository;
            }
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public IRepository<User, string> Users
        {
            get
            {
                if (userRepository == null)
                    userRepository = new UserRepository(db);
                return userRepository;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                if (userManager == null)
                {
                    userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(db));
                    // Configure validation logic for usernames
                    userManager.UserValidator = new UserValidator<ApplicationUser>(userManager)
                    {
                        AllowOnlyAlphanumericUserNames = false,
                        RequireUniqueEmail = true
                    };
                    // Configure validation logic for passwords
                    userManager.PasswordValidator = new PasswordValidator
                    {
                        RequiredLength = 6,
                        RequireNonLetterOrDigit = true,
                        RequireDigit = true,
                        RequireLowercase = true,
                        RequireUppercase = true,
                    };
                }
                return userManager;
            }
        }

        public ApplicationRoleManager RoleManager
        {
            get
            {
                if (roleManager == null)
                    roleManager = new ApplicationRoleManager(new RoleStore<ApplicationRole>(db));
                return roleManager;
            }
        }

        public async Task SaveAsync()
        {
            await db.SaveChangesAsync();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}