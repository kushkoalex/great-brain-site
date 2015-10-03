using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GreatBrain.UI.Models;

namespace GreatBrain.UI.Controllers
{
    public class HomeController : DefaultController
    {
        private readonly SiteContext _context;
        public HomeController(SiteContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            return View();
        }

    }
}
