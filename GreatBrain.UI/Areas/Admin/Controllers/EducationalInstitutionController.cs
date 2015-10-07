using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GreatBrain.UI.Helpers;
using GreatBrain.UI.Models;

namespace GreatBrain.UI.Areas.Admin.Controllers
{
    public class EducationalInstitutionController : AdminController
    {
        private readonly SiteContext _context;

        public EducationalInstitutionController(SiteContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            return View(_context.EducationalInstitutions.ToList());
        }

        public ActionResult Create()
        {
            ViewBag.EducationCountries = _context.EducationCountries.ToList();
            return View(new EducationalInstitution { SortOrder = (_context.EducationalInstitutions.Max(c => (int?)c.SortOrder) ?? 0) + 1 });
        }

        [HttpPost]
        public ActionResult Create(EducationalInstitution model, FormCollection form)
        {
            ViewBag.EducationCountries = _context.EducationCountries.ToList();
            try
            {
                var ecId = int.Parse(form["EducationCountry"]);
                var educationCountry = _context.EducationCountries.First(c => c.Id == ecId);

                var ei = new EducationalInstitution
                {
                    Name = model.Name.UpdatePageWebName(),
                    Title = model.Title ?? "",
                    TitleEn = model.TitleEn ?? "",
                    Address = model.Address,
                    AddressEn = model.AddressEn,
                    Contacts = model.Contacts,
                    ContactsEn = model.ContactsEn,
                    YearOfFoundation = model.YearOfFoundation,
                    Type = model.Type,
                    LocationTitle = model.LocationTitle,
                    LocationTitleEn = model.LocationTitleEn,
                    IsSpecial = model.IsSpecial,
                    WebSiteUrl = model.WebSiteUrl,
                    RectorName = model.RectorName,
                    RectorNameEn = model.RectorNameEn,
                    Email = model.Email,
                    Gender = model.Gender,
                    Description = model.Description == null ? "" : HttpUtility.HtmlDecode(model.Description),
                    DescriptionEn = model.DescriptionEn == null ? "" : HttpUtility.HtmlDecode(model.DescriptionEn),
                    SortOrder = model.SortOrder,
                    EducationCountry = educationCountry,
                    LocationName = model.LocationName,
                    MapLocation = model.MapLocation,
                    NumberOfStudents = model.NumberOfStudents,
                    MinAge = model.MinAge
                };


                var file = Request.Files["LogoImageSrc"];
                if (file != null && !string.IsNullOrEmpty(file.FileName))
                {
                    string fileName = IOHelper.GetUniqueFileName(SiteSettings.EducationalInstitutionLogoImagePath, file.FileName);
                    string filePath = Server.MapPath(SiteSettings.EducationalInstitutionLogoImagePath);

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImage(filePath, fileName, file, 0);
                    ei.LogoImageSrc = fileName;
                }
                else
                {
                    ei.LogoImageSrc = ei.LogoImageSrc ?? "";
                }


                file = Request.Files["PreviewImageSrc"];
                if (file != null && !string.IsNullOrEmpty(file.FileName))
                {
                    string fileName = IOHelper.GetUniqueFileName(SiteSettings.EducationalInstitutionPreviewImagePath, file.FileName);
                    string filePath = Server.MapPath(SiteSettings.EducationalInstitutionPreviewImagePath);

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImageWithDefinedDimentions(filePath, fileName, file, 390, 250, ScaleMode.Crop);
                    ei.PreviewImageSrc = fileName;
                }
                else
                {
                    ei.PreviewImageSrc = ei.PreviewImageSrc ?? "";
                }




                _context.EducationalInstitutions.Add(ei);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }

            catch (Exception ex)
            {
                TempData["errorMessage"] = !string.IsNullOrEmpty(ex.GetEntityValidationException())
                    ? ex.GetEntityValidationException()
                    : ex.Message;
                return View(model);
            }
        }

        public ActionResult Edit(int id)
        {
            var category = _context.EducationalInstitutions.First(c => c.Id == id);
            ViewBag.EducationCountries = _context.EducationCountries.ToList();
            return View(category);
        }

        [HttpPost]
        public ActionResult Edit(int id, EducationalInstitution model, FormCollection form)
        {
            try
            {
                ViewBag.EducationCountries = _context.EducationCountries.ToList();
                var ecId = int.Parse(form["EducationCountry"]);
                var educationCountry = _context.EducationCountries.First(c => c.Id == ecId);

                var ei = _context.EducationalInstitutions.First(ea => ea.Id == id);
                ei.Name = model.Name.UpdatePageWebName();
                ei.Title = model.Title ?? "";
                ei.TitleEn = model.TitleEn ?? "";
                ei.Address = model.Address;
                ei.AddressEn = model.AddressEn;
                ei.Contacts = model.Contacts;
                ei.ContactsEn = model.ContactsEn;
                ei.YearOfFoundation = model.YearOfFoundation;
                ei.Type = model.Type;
                ei.LocationTitle = model.LocationTitle;
                ei.LocationTitleEn = model.LocationTitleEn;
                ei.IsSpecial = model.IsSpecial;
                ei.WebSiteUrl = model.WebSiteUrl;
                ei.RectorName = model.RectorName;
                ei.RectorNameEn = model.RectorNameEn;
                ei.Email = model.Email;
                ei.Gender = model.Gender;
                ei.Description = model.Description == null ? "" : HttpUtility.HtmlDecode(model.Description);
                ei.DescriptionEn = model.DescriptionEn == null ? "" : HttpUtility.HtmlDecode(model.DescriptionEn);
                ei.SortOrder = model.SortOrder;
                ei.EducationCountry = educationCountry;
                ei.LocationName = model.LocationName;
                ei.MapLocation = model.MapLocation;
                ei.NumberOfStudents = model.NumberOfStudents;
                ei.MinAge = model.MinAge;

                var file = Request.Files["LogoImageSrc"];
                if (file != null && !string.IsNullOrEmpty(file.FileName))
                {
                    if (!string.IsNullOrEmpty(ei.LogoImageSrc))
                    {
                        ImageHelper.DeleteImage(ei.LogoImageSrc, SiteSettings.EducationalInstitutionLogoImagePath);
                    }

                    string fileName = IOHelper.GetUniqueFileName(SiteSettings.EducationalInstitutionLogoImagePath, file.FileName);
                    string filePath = Server.MapPath(SiteSettings.EducationalInstitutionLogoImagePath);

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImage(filePath, fileName, file, 0);
                    ei.LogoImageSrc = fileName;
                }
                else
                {
                    ei.LogoImageSrc = ei.LogoImageSrc ?? "";
                }


                file = Request.Files["PreviewImageSrc"];
                if (file != null && !string.IsNullOrEmpty(file.FileName))
                {
                    if (!string.IsNullOrEmpty(ei.PreviewImageSrc))
                    {
                        ImageHelper.DeleteImage(ei.PreviewImageSrc, SiteSettings.EducationalInstitutionPreviewImagePath);
                    }
                    string fileName = IOHelper.GetUniqueFileName(SiteSettings.EducationalInstitutionPreviewImagePath, file.FileName);
                    string filePath = Server.MapPath(SiteSettings.EducationalInstitutionPreviewImagePath);

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImageWithDefinedDimentions(filePath, fileName, file, 390, 250, ScaleMode.Crop);
                    ei.PreviewImageSrc = fileName;
                }
                else
                {
                    ei.PreviewImageSrc = ei.PreviewImageSrc ?? "";
                }



                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = !string.IsNullOrEmpty(ex.GetEntityValidationException())
                    ? ex.GetEntityValidationException()
                    : ex.Message;
                return View(model);
            }
        }


        public ActionResult Delete(int id)
        {
            var ei = _context.EducationalInstitutions.First(b => b.Id == id);
            ImageHelper.DeleteImage(ei.PreviewImageSrc, SiteSettings.EducationalInstitutionPreviewImagePath);
            ImageHelper.DeleteImage(ei.LogoImageSrc, SiteSettings.EducationalInstitutionLogoImagePath);

            while (ei.EducationalInstitutionImages.Any())
            {
                var image = ei.EducationalInstitutionImages.First();
                if (!string.IsNullOrEmpty(image.ImageSrc))
                {
                    ImageHelper.DeleteImage(image.ImageSrc, SiteSettings.EducationalInstitutionImagesPath);
                }
                _context.EducationalInstitutionImages.Remove(image);
            }

            _context.EducationalInstitutions.Remove(ei);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult AddImages(int id)
        {
            var ei = _context.EducationalInstitutions.First(b => b.Id == id);
            return View(ei);
        }

        [HttpPost]
        public ActionResult AddImages(EducationalInstitution model)
        {
            var ei = _context.EducationalInstitutions.First(b => b.Id == model.Id);


            if (Request.Files != null)
            {
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    var file = Request.Files[i];
                    if (file == null) continue;
                    if (string.IsNullOrEmpty(file.FileName)) continue;

                    string fileName = IOHelper.GetUniqueFileName(SiteSettings.EducationalInstitutionImagesPath, file.FileName);
                    string filePath = Server.MapPath(SiteSettings.EducationalInstitutionImagesPath);

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImageWithDefinedDimentions(filePath, fileName, file, 600, 500, ScaleMode.Crop);

                    var image = new EducationalInstitutionImage
                    {
                        ImageSrc = fileName
                    };

                    ei.EducationalInstitutionImages.Add(image);
                }
            }

            _context.SaveChanges();


            return RedirectToAction("Index");
        }

        public ActionResult DeleteImage(int id)
        {
            var image = _context.EducationalInstitutionImages.First(i => i.Id == id);
            if (!string.IsNullOrEmpty(image.ImageSrc))
            {
                ImageHelper.DeleteImage(image.ImageSrc, SiteSettings.EducationalInstitutionImagesPath);
            }
            _context.EducationalInstitutionImages.Remove(image);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}
