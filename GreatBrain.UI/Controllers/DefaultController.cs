using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using GreatBrain.UI.Models;

namespace GreatBrain.UI.Controllers
{
    public class DefaultController : Controller
    {
        protected string CurrentLangCode { get; set; }
        protected SiteLanguage CurrentLang { get; set; }


        public DefaultController()
        {
            ViewBag.Title = "Great Brain";
        }

        protected override void Initialize(RequestContext requestContext)
        {
            if (requestContext.RouteData.Values["lang"] != null && requestContext.RouteData.Values["lang"] as string != "null")
            {
                CurrentLangCode = requestContext.RouteData.Values["lang"] as string ?? "ru";

                switch (CurrentLangCode)
                {
                    case "ru":
                        CurrentLang = SiteLanguage.ru;
                        break;
                    case "en":
                        CurrentLang = SiteLanguage.en;
                        break;
                    default:
                        CurrentLang = SiteLanguage.ru;
                        break;
                }

                ViewBag.Locale = CurrentLangCode;

                var ci = new CultureInfo(CurrentLangCode);
                Thread.CurrentThread.CurrentUICulture = ci;
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(ci.Name);
            }

            base.Initialize(requestContext);
        }
    }
}
