using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using GreatBrain.UI.App_LocalResources;
using GreatBrain.UI.Models;
using Newtonsoft.Json;

namespace GreatBrain.UI.Controllers
{
    public class DefaultController : Controller
    {
        protected string CurrentLangCode { get; set; }
        protected SiteLanguage CurrentLang { get; set; }
        private readonly SiteContext _context;

        private string GetMenuItemState(int id, int activeMenuItemId, bool clickable)
        {
            if (activeMenuItemId == id && clickable)
            {
                return "activeClickable";
            }
            return activeMenuItemId == id ? "active" : "plain";
        }
        private string GetCountries()
        {
            var result = new List<object>();
            var countries = _context.EducationCountries.ToList();
            foreach (var item in countries)
            {
                result.Add(new
                {
                    title = CurrentLang == SiteLanguage.en ? item.TitleEn : item.Title,
                    code = item.Name,
                    url = "/" + CurrentLangCode + "/" + item.Name + "/"
                });
            }

            return "dataModels.educationalCountries = " + JsonConvert.SerializeObject(result);
        }

        public DefaultController(SiteContext context)
        {
            _context = context;
            
           
        }

        public DefaultController()
        {
            ViewBag.Title = "Great Brain";
        }

        private string GenerateServiceMenu()
        {
            var result = new List<object>();
            var serviceContents = _context.ServiceContents.ToList();
            foreach (var item in serviceContents)
            {
                result.Add(new
                {
                    title = CurrentLang == SiteLanguage.en ? item.TitleEn : item.Title,
                    type = item.ServiceType,
                    special = item.IsSpecial,
                    url = "/" + CurrentLangCode + "/services/" + item.Name
                });
            }

            return "dataModels.servicesMenu = " + JsonConvert.SerializeObject(result);
        }

        

        protected string GenerateMainMenu(int activeMenuItemId=0, bool clickable = false)
        {

            var contents = _context.Contents.ToList();

            var result = new List<object>();

            result.Add(new
            {
                title = GlobalRes.EducationKinds,
                state = GetMenuItemState(1, activeMenuItemId, clickable),
                popup = true
            });
            result.Add(new
            {
                title = GlobalRes.Services,
                state = GetMenuItemState(2, activeMenuItemId, clickable),
                popup = true,
                isServiceMenuItem = true
            });
            result.Add(new
            {
                title = GlobalRes.EducationalInstitutions,
                state = GetMenuItemState(3, activeMenuItemId, clickable),
                hasArrow = false,
                url = "/" + CurrentLangCode + "/catalogue"
            });
            result.Add(new
            {
                title = GlobalRes.News,
                state = GetMenuItemState(4, activeMenuItemId, clickable),
                url = "/" + CurrentLangCode + "/news"
            });

            foreach (var content in contents.Where(c => c.Name != "roadmap").OrderBy(c => c.SortOrder))
            {
                result.Add(new
                {
                    title = CurrentLang == SiteLanguage.en ? content.MenuTitleEn : content.MenuTitle,
                    state = GetMenuItemState(content.Id, activeMenuItemId, clickable),
                    url = "/" + CurrentLangCode +"/"+ content.Name
                });
            }

            result.Add(new
            {
                title = GlobalRes.Contacts,
                state = GetMenuItemState(5, activeMenuItemId, clickable),
                url = "/" + CurrentLangCode + "/contacts"
            });

            return "dataModels.mainMenu = " + JsonConvert.SerializeObject(result);

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
            ViewBag.Countries = GetCountries();
            ViewBag.ServiceMenu = GenerateServiceMenu();


            base.Initialize(requestContext);

        }
    }
}
