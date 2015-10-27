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
    public class ArticleController : AdminController
    {
        private readonly SiteContext _context;

        public ArticleController(SiteContext context)
        {
            _context = context;
        }


        public ActionResult Index()
        {
            return View(_context.Articles.OrderByDescending(a => a.Date).ToList());
        }

        public ActionResult Create()
        {
            return View(new Article() { Date=DateTime.Now.Date});
        }

        [HttpPost]
        public ActionResult Create(Article model)
        {
            try
            {
                var article = new Article
                {
                    Name = model.Name.UpdatePageWebName(),
                    Title = model.Title ?? "",
                    TitleEn = model.TitleEn ?? "",
                    Date = model.Date,
                    ShortDescription = model.ShortDescription,
                    ShortDescriptionEn = model.ShortDescriptionEn,
                    Text = model.Text == null ? "" : HttpUtility.HtmlDecode(model.Text),
                    TextEn = model.TextEn == null ? "" : HttpUtility.HtmlDecode(model.TextEn),
                    ShowAsBanner = model.ShowAsBanner
                };


                var file = Request.Files["PreviewImageSrc"];
                if (file != null && !string.IsNullOrEmpty(file.FileName))
                {
                    string fileName = IOHelper.GetUniqueFileName(SiteSettings.ArticlePreviewPath, file.FileName);
                    string filePath = Server.MapPath(SiteSettings.ArticlePreviewPath);

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImageWithDefinedDimentions(filePath, fileName, file, 238, 237, ScaleMode.Crop);
                    article.PreviewImageSrc = fileName;
                }
                else
                {
                    article.PreviewImageSrc = article.PreviewImageSrc ?? "";
                }

                file = Request.Files["BannerImageSrc"];
                if (file != null && !string.IsNullOrEmpty(file.FileName))
                {
                    string fileName = IOHelper.GetUniqueFileName(SiteSettings.BannersPath, file.FileName);
                    string filePath = Server.MapPath(SiteSettings.BannersPath);

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImageWithDefinedDimentions(filePath, fileName, file, 380, 170, ScaleMode.Crop);
                    article.BannerImageSrc = fileName;
                }
                else
                {
                    article.BannerImageSrc = article.BannerImageSrc ?? "";
                }




                _context.Articles.Add(article);
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
            var article = _context.Articles.First(c => c.Id == id);
            return View(article);
        }

        [HttpPost]
        public ActionResult Edit(int id, Article model)
        {
            var article = _context.Articles.First(a => a.Id == model.Id);
            article.Name = model.Name.UpdatePageWebName();
            article.Title = model.Title ?? "";
            article.TitleEn = model.TitleEn ?? "";
            article.Date = model.Date;
            article.ShortDescription = model.ShortDescription;
            article.ShortDescriptionEn = model.ShortDescriptionEn;
            article.Text = model.Text == null ? "" : HttpUtility.HtmlDecode(model.Text);
            article.TextEn = model.TextEn == null ? "" : HttpUtility.HtmlDecode(model.TextEn);
            article.ShowAsBanner = model.ShowAsBanner;

            var file = Request.Files["PreviewImageSrc"];
            if (file != null && !string.IsNullOrEmpty(file.FileName))
            {
                if (!string.IsNullOrEmpty(article.PreviewImageSrc))
                {
                    ImageHelper.DeleteImage(article.PreviewImageSrc, SiteSettings.ArticlePreviewPath);
                }

                string fileName = IOHelper.GetUniqueFileName(SiteSettings.ArticlePreviewPath, file.FileName);
                string filePath = Server.MapPath(SiteSettings.ArticlePreviewPath);

                filePath = Path.Combine(filePath, fileName);
                GraphicsHelper.SaveOriginalImageWithDefinedDimentions(filePath, fileName, file, 238, 237, ScaleMode.Crop);
                article.PreviewImageSrc = fileName;
            }
            else
            {
                article.PreviewImageSrc = article.PreviewImageSrc ?? "";
            }

            file = Request.Files["BannerImageSrc"];
            if (file != null && !string.IsNullOrEmpty(file.FileName))
            {
                if (!string.IsNullOrEmpty(article.BannerImageSrc))
                {
                    ImageHelper.DeleteImage(article.BannerImageSrc, SiteSettings.BannersPath);
                }

                string fileName = IOHelper.GetUniqueFileName(SiteSettings.BannersPath, file.FileName);
                string filePath = Server.MapPath(SiteSettings.BannersPath);

                filePath = Path.Combine(filePath, fileName);
                GraphicsHelper.SaveOriginalImageWithDefinedDimentions(filePath, fileName, file, 380, 170, ScaleMode.Crop);
                article.BannerImageSrc = fileName;
            }
            else
            {
                article.BannerImageSrc = article.BannerImageSrc ?? "";
            }

            _context.SaveChanges();
            return RedirectToAction("Index");
        }


        public ActionResult Delete(int id)
        {
            var article = _context.Articles.First(b => b.Id == id);
            ImageHelper.DeleteImage(article.PreviewImageSrc, SiteSettings.ArticlePreviewPath);
            ImageHelper.DeleteImage(article.BannerImageSrc, SiteSettings.BannersPath);

            while (article.ArticleImages.Any())
            {
                var image = article.ArticleImages.First();
                if (!string.IsNullOrEmpty(image.ImageSrc))
                {
                    ImageHelper.DeleteImage(image.ImageSrc, SiteSettings.ArticleImagesPath);
                }
                _context.ArticleImages.Remove(image);
            }

            _context.Articles.Remove(article);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult AddImages(int id)
        {
            var ei = _context.Articles.First(b => b.Id == id);
            return View(ei);
        }

        [HttpPost]
        public ActionResult AddImages(EducationalInstitution model)
        {
            var article = _context.Articles.First(b => b.Id == model.Id);


            if (Request.Files != null)
            {
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    var file = Request.Files[i];
                    if (file == null) continue;
                    if (string.IsNullOrEmpty(file.FileName)) continue;

                    string fileName = IOHelper.GetUniqueFileName(SiteSettings.ArticleImagesPath, file.FileName);
                    string filePath = Server.MapPath(SiteSettings.ArticleImagesPath);

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImageWithDefinedDimentions(filePath, fileName, file, 600, 500, ScaleMode.Crop);

                    var image = new ArticleImage
                    {
                        ImageSrc = fileName
                    };

                    article.ArticleImages.Add(image);
                }
            }

            _context.SaveChanges();


            return RedirectToAction("Index");
        }

        public ActionResult DeleteImage(int id)
        {
            var image = _context.ArticleImages.First(i => i.Id == id);
            if (!string.IsNullOrEmpty(image.ImageSrc))
            {
                ImageHelper.DeleteImage(image.ImageSrc, SiteSettings.ArticleImagesPath);
            }
            _context.ArticleImages.Remove(image);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}
