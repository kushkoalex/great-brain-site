using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace GreatBrain.UI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("favicon.ico");
            
            routes.MapRoute(
               "Login",
               "login",
               new { controller = "Auth", action = "Login" },
               new[] { "GreatBrain.UI.Controllers" }
            );

            routes.MapRoute(
               "Logout",
               "logout",
               new { controller = "Auth", action = "Logout"},
               new[] { "GreatBrain.UI.Controllers" }
            );


            routes.MapRoute(
               "Default1",
               "{lang}",
               new { controller = "Home", action = "Index", lang = "ru" },
               new { lang = @"ru|en" },
              new[] { "GreatBrain.UI.Controllers" }
          );

            routes.MapRoute(
                  "Default",
                  "{controller}/{action}/{id}",
                  new { controller = "Home", action = "Index", id = UrlParameter.Optional, lang = "ru" },
                  new { lang = @"ru|en" },
                 new[] { "GreatBrain.UI.Controllers" }
             );
        }
    }
}