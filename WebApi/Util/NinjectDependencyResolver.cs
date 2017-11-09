using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Services;
using Ninject;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace WebApi.Util
{
    public class NinjectDependencyResolver : IDependencyResolver
    {
        private IKernel kernel;
        public NinjectDependencyResolver(IKernel kernelParam)
        {
            kernel = kernelParam;
            AddBindings();
        }

        public object GetService(Type serviceType)
        {
            return kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return kernel.GetAll(serviceType);
        }

        private void AddBindings()
        {
            kernel.Bind<IUserService>().To<UserService>();
            kernel.Bind<IChatService>().To<ChatService>();
        }
    }
}