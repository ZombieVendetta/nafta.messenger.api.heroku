﻿using DataAccessLayer.Entities;
using Microsoft.AspNet.Identity;

namespace DataAccessLayer.Identity
{
    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store) : base(store)
        {
        }
    }
}