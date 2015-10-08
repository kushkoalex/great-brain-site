using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GreatBrain.UI.App_LocalResources;
using GreatBrain.UI.Models;
using Newtonsoft.Json;

namespace GreatBrain.UI.Controllers
{
    public class HomeController : DefaultController
    {
        private readonly SiteContext _context;
        public HomeController(SiteContext context)
        {
            _context = context;
        }

        private string GetMenuItemState(int id, int activeMenuItemId, bool clickable)
        {
            if (activeMenuItemId == id && clickable)
            {
                return "activeClickable";
            }
            return activeMenuItemId == id ? "active" : "plain";
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
                    type=item.ServiceType,
                    special=item.IsSpecial,
                    url = "/" + CurrentLangCode + "/services/"+item.Name
                });
            }

            return "dataModels.servicesMenu = " + JsonConvert.SerializeObject(result);
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

        private string GenerateMainMenu(int activeMenuItemId, bool clickable = false)
        {

            var contents = _context.Contents.ToList();

            var result = new List<object>();

            result.Add(new
            {
                title = GlobalRes.EducationKinds, 
                state = GetMenuItemState(1,activeMenuItemId,clickable),
                popup = true
            });
            result.Add(new
            {
                title = GlobalRes.Services, 
                state = GetMenuItemState(2,activeMenuItemId,clickable), 
                popup = true,
                isServiceMenuItem=true
            });
            result.Add(new
            {
                title = GlobalRes.EducationalInstitutions, 
                state = GetMenuItemState(3,activeMenuItemId,clickable), 
                hasArrow = false,
                url = "/" + CurrentLangCode + "/catalogue"
            });
            result.Add(new
            {
                title = GlobalRes.News,
                state = GetMenuItemState(4, activeMenuItemId, clickable), 
                url = "/" + CurrentLangCode + "/news"
            });

            foreach (var content in contents.OrderBy(c => c.SortOrder))
            {
                result.Add(new
                {
                    title = CurrentLang == SiteLanguage.en ? content.MenuTitleEn : content.MenuTitle,
                    state = GetMenuItemState(content.Id, activeMenuItemId, clickable),
                    url = "/" + CurrentLangCode + "/" + content.Name
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

        public ActionResult Index()
        {
            ViewBag.MainMenu = GenerateMainMenu(1);
            ViewBag.ServiceMenu = GenerateServiceMenu();
            ViewBag.Countries = GetCountries();

            var mb = _context.MainBanners.ToList();
            var ca = _context.ContentAnnouncements.ToList();

            var mainBanners = new List<object>();
            foreach (var item in mb)
            {
                mainBanners.Add(new
                {
                    title = CurrentLang == SiteLanguage.en ? item.TitleEn : item.Title,
                    description = CurrentLang == SiteLanguage.en ? item.DescriptionEn : item.Description,
                    sign = CurrentLang == SiteLanguage.en ? item.SignEn : item.Sign,
                    signImage = item.SignImageSrc,
                    imageSrc = item.ImageSrc
                });
            }
            var parallaxImages = _context.ParallaxImages.Select(image => image.ImageSrc).ToArray();


            var contentAnnouncements = new List<object>();
            foreach (var item in ca)
            {
                contentAnnouncements.Add(new
                {
                    title = CurrentLang == SiteLanguage.en ? item.TitleEn : item.Title,
                    text = CurrentLang == SiteLanguage.en ? item.TextEn : item.Text,
                    imageSrc = item.ImageSrc,
                    url=item.Url
                });
            }


            var mainPage = new { mainBanners = mainBanners, contentAnnouncements = contentAnnouncements, parallaxImages = parallaxImages };

            ViewBag.MainPage = "dataModels.mainPage = " + JsonConvert.SerializeObject(mainPage);


            var mapLocations = new List<object>();
            var ml = _context.MapLocations.ToList();
            foreach (var item in ml)
            {
                var location = new
                {
                    lat = item.LocationLat,
                    lng = item.LocationLng,
                    contentAddress =
                        CurrentLang == SiteLanguage.en ? item.LocationContentAddressEn : item.LocationContentAddress,
                    contentPhone = item.LocationContentPhone,
                    contentEmail = item.LocationContentEmail,
                    title = CurrentLang == SiteLanguage.en ? item.LocationTitleEn : item.LocationTitle
                };

                mapLocations.Add(new
                {
                    title = item.Title,
                    location=location
                });
            }

            ViewBag.MapLocations = "dataModels.mapLocations = " + JsonConvert.SerializeObject(mapLocations);

            return View();
        }

       
    }
}
