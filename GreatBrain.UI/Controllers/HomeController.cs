using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GreatBrain.UI.App_LocalResources;
using GreatBrain.UI.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Schema;
using GreatBrain.UI.Helpers;

namespace GreatBrain.UI.Controllers
{
    public class HomeController : DefaultController
    {
        private readonly SiteContext _context;
        public HomeController(SiteContext context)
            : base(context)
        {
            _context = context;
        }



        public ActionResult Index()
        {
            ViewBag.MainMenu = GenerateMainMenu(0);

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
                    url = item.Url
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
                    location = location
                });
            }

            ViewBag.MapLocations = "dataModels.mapLocations = " + JsonConvert.SerializeObject(mapLocations);

            return View();
        }

        public ActionResult EducationKinds(string country, string category, string age)
        {
            ViewBag.MainMenu = GenerateMainMenu(1);
            ViewBag.SelectedCountry = country;
            var ecList = _context.EducationCategories.Where(c => c.EducationCountry.Name == country).ToList();
            var ec = ecList.FirstOrDefault(c => c.Name == category || category == null);
            if (ec == null)
                throw new Exception("You have to add Education category item");
            var ag = ec.AgeGroups.FirstOrDefault(c => c.Name == age || age == null);

            if (ag == null)
                throw new Exception("You have to add Age group item");


            var educationCaregories = new List<object>();

            foreach (var item in ecList)
            {
                bool active = item.Name == ec.Name;
                var ageGroups = new List<object>();

                if (active)
                {
                    foreach (var a in ec.AgeGroups)
                    {
                        ageGroups.Add(new
                        {
                            id = a.Id,
                            name = a.Name,
                            age = CurrentLang == SiteLanguage.en ? a.AgeEn : a.Age,
                            text = CurrentLang == SiteLanguage.en ? a.Text : a.TextEn,
                            active = a.Name == ag.Name,
                            imageSrc = "",
                            parallaxImageSrc = ""
                        });
                    }
                }

                educationCaregories.Add(new
                {
                    id = item.Id,
                    title = CurrentLang == SiteLanguage.en ? item.TitleEn : item.Title,
                    active = active,
                    age = CurrentLang == SiteLanguage.en ? item.AgeEn : item.Age,
                    ageGroups = ageGroups,
                    url = "/" + CurrentLang + "/" + country + "/" + item.Name,
                    name = item.Name
                });
            }

            ViewBag.EducationKinds = "dataModels.educationKinds = " + JsonConvert.SerializeObject(new { educationCategories = educationCaregories });

            return View();
        }

        public ActionResult Contacts()
        {
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
                    location = location
                });
            }

            ViewBag.MapLocations = "dataModels.mapLocations = " + JsonConvert.SerializeObject(mapLocations);

            ViewBag.Contacts = "dataModels.contacts = " +
                               JsonConvert.SerializeObject(
                                   new {title = CurrentLang == SiteLanguage.en ? "Contacts" : "Контактные сведения"});

            ViewBag.MainMenu = GenerateMainMenu(5);

            return View();
        }

        [HttpPost]
        public ActionResult FastContact(string phoneNumber)
        {
            
            return Json("");
        }


        public ActionResult SiteContent(string id)
        {
            var content = _context.Contents.First(c => c.Name == id);

            ViewBag.MainMenu = GenerateMainMenu(content.Id);

            ViewBag.SiteContent = "dataModels.siteContent = " +
                               JsonConvert.SerializeObject(
                                   new
                                   {
                                       title = CurrentLang == SiteLanguage.en ? content.TitleEn : content.Title,
                                       text = CurrentLang == SiteLanguage.en ? content.TextEn : content.Text
                                   });
            return View();
        }

        public ActionResult RoadMap(string id)
        {
            var content = _context.Contents.First(c => c.Name == id);

            ViewBag.MainMenu = GenerateMainMenu(0);

            ViewBag.RoadMap = "dataModels.roadMap = " +
                               JsonConvert.SerializeObject(
                                   new
                                   {
                                       title = CurrentLang == SiteLanguage.en ? content.TitleEn : content.Title,
                                       text = CurrentLang == SiteLanguage.en ? content.TextEn : content.Text
                                   });
            return View();
        }

        public ActionResult Services(string id)
        {
            ViewBag.MainMenu = GenerateMainMenu(2);
            var service = _context.ServiceContents.First(s => s.Name == id);
            ViewBag.Services = "dataModels.services = " + JsonConvert.SerializeObject(new
            {
                title = CurrentLang == SiteLanguage.en ? service.TitleEn : service.Title,
                text = CurrentLang == SiteLanguage.en ? service.TextEn : service.Text,
            });
            return View();
        }

        public ActionResult Catalogue(string country, string gender, string location, string type)
        {
            ViewBag.MainMenu = GenerateMainMenu(3);

            if (gender == null) {
                gender = SiteContentHelper.Gender.First().Key;
            }

            if (type == null)
            {
                type = SiteContentHelper.Type.First().Key;
            }

            if (location == null) {
                location = "none";
            }
            
            

            var educationalInstitutions = new List<object>();

            var ei = _context.EducationalInstitutions.ToList();

            foreach (var item in ei)
            {
               educationalInstitutions.Add(new
               {
                   title = CurrentLang == SiteLanguage.en ? item.TitleEn : item.Title,
                   titleEng = item.TitleEn,
                   location = CurrentLang == SiteLanguage.en ?item.LocationTitleEn:item.LocationTitle,
                   gender = item.Gender,
                   type = item.Type,
                   logoSrc = item.LogoImageSrc,
                   previewImageSrc = item.PreviewImageSrc,
                   address = CurrentLang == SiteLanguage.en ? item.AddressEn : item.Address,
                   mapLocation = item.MapLocation,
                   minAge = item.MinAge,
                   yearOfFoundation = item.YearOfFoundation,
                   numberOfStudents = item.NumberOfStudents,
                   rector = CurrentLang == SiteLanguage.en ? item.RectorNameEn : item.RectorName,
                   contacts = CurrentLang == SiteLanguage.en ? item.ContactsEn : item.Contacts,
                   description = CurrentLang == SiteLanguage.en ? item.DescriptionEn : item.Description,
                   name = item.Name
               }); 
            }

            ViewBag.EducationalInstitutions = "dataModels.educationalInstitutions = " + JsonConvert.SerializeObject(educationalInstitutions);

            var educationalInstitutionFilterGender = new List<object>();
            foreach (var item in SiteContentHelper.Gender) {
                educationalInstitutionFilterGender.Add(new { title = item.Value, value = item.Key, selected = item.Key == gender });
            }
            ViewBag.EducationalInstitutionFilterGender = "dataModels.educationalInstitutionFilterGender = " + JsonConvert.SerializeObject(educationalInstitutionFilterGender);


            var locations = new List<object>();
            locations.Add(new { title = "not selected", value = "none", selected = location==null });

            var otherLocations = ei.Select(c => c.LocationName).Distinct().ToList();

            foreach (var item in otherLocations)
            {
                locations.Add(new { title = item, value = item, selected = location == item });
            }

            ViewBag.EducationalInstitutionFilterLocation = "dataModels.educationalInstitutionFilterLocation = " + JsonConvert.SerializeObject(locations);


            var educationalInstitutionFilterType = new List<object>();
            foreach (var item in SiteContentHelper.Type)
            {
                educationalInstitutionFilterType.Add(new { title = item.Value, value = item.Key, selected = item.Key == type });
            }
            ViewBag.EducationalInstitutionFilterType = "dataModels.educationalInstitutionFilterType = " + JsonConvert.SerializeObject(educationalInstitutionFilterType);

            ViewBag.SelectedGender = gender;
            ViewBag.SelectedLocation = location;
            ViewBag.SelectedType = type;

            return View();
        }


        public ActionResult CatalogueItemDetails(string id)
        {
            ViewBag.MainMenu = GenerateMainMenu(3, true);
            var item = _context.EducationalInstitutions.First(i => i.Name == id);


            var iamges = item.EducationalInstitutionImages.Select(c=>c.ImageSrc).ToArray();

            var educationalInstitutionDetails = new
            {
                title = CurrentLang == SiteLanguage.en ? item.TitleEn : item.Title,
                titleEng = item.TitleEn,
                location = CurrentLang == SiteLanguage.en ? item.LocationTitleEn : item.LocationTitle,
                gender = item.Gender,
                type = item.Type,
                logoImageSrc = item.LogoImageSrc,
                previewImageSrc = item.PreviewImageSrc,
                address = CurrentLang == SiteLanguage.en ? item.AddressEn : item.Address,
                mapLocation = item.MapLocation,
                minAge = item.MinAge,
                yearOfFoundation = item.YearOfFoundation,
                numberOfStudents = item.NumberOfStudents,
                rector = CurrentLang == SiteLanguage.en ? item.RectorNameEn : item.RectorName,
                contacts = CurrentLang == SiteLanguage.en ? item.ContactsEn : item.Contacts,
                description = CurrentLang == SiteLanguage.en ? item.DescriptionEn : item.Description,
                email=item.Email,
                website = item.WebSiteUrl,
                images = iamges
            };

            ViewBag.EducationalInstitutionDetails = "dataModels.educationalInstitutionDetails = " + JsonConvert.SerializeObject(educationalInstitutionDetails);

            return View();
        }


        public ActionResult News() {
            return View();
        }

        public ActionResult NewsDetails(string id)
        {
            return View();
        }

        public ActionResult Blog()
        {
            return View();
        }

        public ActionResult BlogDetails(string id)
        {
            return View();
        }



    }
}
