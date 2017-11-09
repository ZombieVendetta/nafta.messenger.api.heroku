using System.Web.Mvc;

namespace WebApi.Controllers
{
    /// <summary>Home Controller</summary>
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}