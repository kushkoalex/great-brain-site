using System.IO;
using System.Linq;
using System.Web.Mvc;
using GreatBrain.UI.Areas.Admin.Controllers;
using GreatBrain.UI.Helpers;
using GreatBrain.UI.Models;
using GreatBrain.UI.Models;

namespace NewVision.UI.Areas.Admin.Controllers
{
    public class MainBannerController : AdminController
    {

        private readonly SiteContext _context;

        public MainBannerController(SiteContext context)
        {
            _context = context;
        }
        //
        // GET: /Admin/MainBanner/

        public ActionResult Index()
        {
            var mainBanners = _context.MainBanners.ToList();
            return View(mainBanners);
        }

        //
        // GET: /Admin/MainBanner/Create

        public ActionResult Create()
        {

            return View(new MainBanner());
        }

        //
        // POST: /Admin/MainBanner/Create

        [HttpPost]
        public ActionResult Create(MainBanner model)
        {
            try
            {
                var mainBanner = new MainBanner
                {
                    Title = model.Title ?? "", 
                    TitleEn = model.TitleEn ?? "", 
                    Description = model.Description ?? "",
                    DescriptionEn = model.DescriptionEn ?? "",
                };

                var file = Request.Files[0];
                if (file != null && !string.IsNullOrEmpty(file.FileName))
                {
                    string fileName = IOHelper.GetUniqueFileName("~/Content/Images", file.FileName);
                    string filePath = Server.MapPath("~/Content/Images");

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImage(filePath, fileName, file, 1500);
                    mainBanner.ImageSrc = fileName;
                }
                else
                {
                    mainBanner.ImageSrc = mainBanner.ImageSrc ?? "";
                }

                _context.MainBanners.Add(mainBanner);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Admin/MainBanner/Edit/5

        public ActionResult Edit(int id)
        {
            var mainBanner = _context.MainBanners.First(b => b.Id == id);
            return View(mainBanner);
        }

        //
        // POST: /Admin/MainBanner/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, MainBanner model)
        {
            try
            {
                var mainBanner = _context.MainBanners.First(b => b.Id == id);
                mainBanner.Title = model.Title ?? "";
                mainBanner.TitleEn = model.TitleEn ?? "";
                mainBanner.Description = model.Description ?? "";
                mainBanner.DescriptionEn = model.DescriptionEn ?? "";

                var file = Request.Files[0];
                if (file != null && !string.IsNullOrEmpty(file.FileName))
                {
                    if (!string.IsNullOrEmpty(mainBanner.ImageSrc))
                    {
                        ImageHelper.DeleteImage(mainBanner.ImageSrc);
                    }

                    string fileName = IOHelper.GetUniqueFileName("~/Content/Images", file.FileName);
                    string filePath = Server.MapPath("~/Content/Images");

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImage(filePath, fileName, file, 1500);
                    mainBanner.ImageSrc = fileName;
                }
                else
                {
                    mainBanner.ImageSrc = mainBanner.ImageSrc ?? "";
                }

                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Admin/MainBanner/Delete/5

        public ActionResult Delete(int id)
        {
            var mainBanner = _context.MainBanners.First(b => b.Id == id);
            ImageHelper.DeleteImage(mainBanner.ImageSrc);
            _context.MainBanners.Remove(mainBanner);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}
