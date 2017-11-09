using DataAccessLayer.Entities;
using DataAccessLayer.Identity;
using System;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Chat, int> Chats { get; }        
        IRepository<Message, int> Messages { get; }
        IRepository<User, string> Users { get; }

        ApplicationUserManager UserManager { get; }
        ApplicationRoleManager RoleManager { get; }
        Task SaveAsync();
        void Save();
    }
}