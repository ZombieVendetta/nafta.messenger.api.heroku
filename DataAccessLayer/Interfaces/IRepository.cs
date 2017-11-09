using System;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces
{
    public interface IRepository<T, V> where T : class
    {
        IEnumerable<T> GetAll();
        T Get(V id);
        IEnumerable<T> Find(Func<T, Boolean> predicate);
        void Create(T item);
        void Update(T item);
        void Delete(V id);
    }
}