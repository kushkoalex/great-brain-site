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
              "fastcontact",
              "fastcontact",
              new { controller = "Home", action = "FastContact" },
              new { lang = @"ru|en" },
              new[] { "GreatBrain.UI.Controllers" }
          );

            routes.MapRoute(
               "contacts",
               "{lang}/contacts",
               new { controller = "Home", action = "Contacts" },
               new { lang = @"ru|en" },
               new[] { "GreatBrain.UI.Controllers" }
           );

            routes.MapRoute(
               "services",
               "{lang}/services/{id}",
               new { controller = "Home", action = "Services" },
               new { lang = @"ru|en" },
               new[] { "GreatBrain.UI.Controllers" }
           );

            routes.MapRoute(
               "roadmap",
               "{lang}/roadmap",
               new { controller = "Home", action = "RoadMap", id="roadmap" },
               new { lang = @"ru|en" },
               new[] { "GreatBrain.UI.Controllers" }
           );

            routes.MapRoute(
               "catalogue",
               "{lang}/catalogue",
               new { controller = "Home", action = "Catalogue" },
               new { lang = @"ru|en" },
               new[] { "GreatBrain.UI.Controllers" }
           );

          //  routes.MapRoute(
          //    "EducationKinds",
          //    "{lang}/{country}/{age}",
          //    new { controller = "Home", action = "EducationKinds",age = UrlParameter.Optional},
          //    new { lang = @"ru|en" ,country=@"gb|swe" },
          //    new[] { "GreatBrain.UI.Controllers" }
          //);

            routes.MapRoute(
              "EducationKinds",
              "{lang}/{country}/{category}/{age}",
              new { controller = "Home", action = "EducationKinds", age = UrlParameter.Optional, category = UrlParameter.Optional },
              new { lang = @"ru|en", country = @"gb|swe" },
              new[] { "GreatBrain.UI.Controllers" }
          );


            





            routes.MapRoute(
         "content",
         "{lang}/{id}",
         new { controller = "Home", action = "SiteContent", lang = "ru" },
         new { lang = @"ru|en" },
         new[] { "NewVision.UI.Controllers" }
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