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
    public class ParallaxController : AdminController
    {
        private readonly SiteContext _context;

        public ParallaxController(SiteContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            return View(_context.ParallaxImages.ToList());
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(ParallaxImage model)
        {
            if (Request.Files != null)
            {
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    var file = Request.Files[i];
                    if (file == null) continue;
                    if (string.IsNullOrEmpty(file.FileName)) continue;

                    string fileName = IOHelper.GetUniqueFileName(SiteSettings.Parallax, file.FileName);
                    string filePath = Server.MapPath(SiteSettings.Parallax);

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImage(filePath, fileName, file, 0);

                    var image = new ParallaxImage
                    {
                        ImageSrc = fileName
                    };
                    _context.ParallaxImages.Add(image);
                }
            }

            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        public ActionResult Delete(int id)
        {
            var parallaxImage = _context.ParallaxImages.First(b => b.Id == id);
            ImageHelper.DeleteImage(parallaxImage.ImageSrc, SiteSettings.Parallax);
            _context.ParallaxImages.Remove(parallaxImage);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}
