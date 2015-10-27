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
    public class BlogController : AdminController
    {
        private readonly SiteContext _context;

        public BlogController(SiteContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            return View(_context.BlogItems.OrderByDescending(a => a.Date).ToList());
        }

        public ActionResult Create()
        {
            return View(new BlogItem() { Date=DateTime.Now.Date});
        }

        [HttpPost]
        public ActionResult Create(BlogItem model)
        {
            try
            {
                var blogItem = new BlogItem
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
                    string fileName = IOHelper.GetUniqueFileName(SiteSettings.BlogPreviewPath, file.FileName);
                    string filePath = Server.MapPath(SiteSettings.BlogPreviewPath);

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImageWithDefinedDimentions(filePath, fileName, file, 247, 247, ScaleMode.Crop);
                    blogItem.PreviewImageSrc = fileName;
                }
                else
                {
                    blogItem.PreviewImageSrc = blogItem.PreviewImageSrc ?? "";
                }

                file = Request.Files["BannerImageSrc"];
                if (file != null && !string.IsNullOrEmpty(file.FileName))
                {
                    string fileName = IOHelper.GetUniqueFileName(SiteSettings.BannersPath, file.FileName);
                    string filePath = Server.MapPath(SiteSettings.BannersPath);

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImageWithDefinedDimentions(filePath, fileName, file, 380, 170, ScaleMode.Crop);
                    blogItem.BannerImageSrc = fileName;
                }
                else
                {
                    blogItem.BannerImageSrc = blogItem.BannerImageSrc ?? "";
                }




                _context.BlogItems.Add(blogItem);
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
            var blogItem = _context.BlogItems.First(c => c.Id == id);
            return View(blogItem);
        }

        [HttpPost]
        public ActionResult Edit(int id, BlogItem model)
        {
            var blogItem = _context.BlogItems.First(a => a.Id == model.Id);
            blogItem.Name = model.Name.UpdatePageWebName();
            blogItem.Title = model.Title ?? "";
            blogItem.TitleEn = model.TitleEn ?? "";
            blogItem.Date = model.Date;
            blogItem.ShortDescription = model.ShortDescription;
            blogItem.ShortDescriptionEn = model.ShortDescriptionEn;
            blogItem.Text = model.Text == null ? "" : HttpUtility.HtmlDecode(model.Text);
            blogItem.TextEn = model.TextEn == null ? "" : HttpUtility.HtmlDecode(model.TextEn);
            blogItem.ShowAsBanner = model.ShowAsBanner;
            var file = Request.Files["PreviewImageSrc"];
            
            if (file != null && !string.IsNullOrEmpty(file.FileName))
            {
                if (!string.IsNullOrEmpty(blogItem.PreviewImageSrc))
                {
                    ImageHelper.DeleteImage(blogItem.PreviewImageSrc, SiteSettings.BlogPreviewPath);
                }

                string fileName = IOHelper.GetUniqueFileName(SiteSettings.BlogPreviewPath, file.FileName);
                string filePath = Server.MapPath(SiteSettings.BlogPreviewPath);

                filePath = Path.Combine(filePath, fileName);
                GraphicsHelper.SaveOriginalImageWithDefinedDimentions(filePath, fileName, file, 247, 247, ScaleMode.Crop);
                blogItem.PreviewImageSrc = fileName;
            }
            else
            {
                blogItem.PreviewImageSrc = blogItem.PreviewImageSrc ?? "";
            }

            file = Request.Files["BannerImageSrc"];
            if (file != null && !string.IsNullOrEmpty(file.FileName))
            {
                if (!string.IsNullOrEmpty(blogItem.BannerImageSrc))
                {
                    ImageHelper.DeleteImage(blogItem.BannerImageSrc, SiteSettings.BannersPath);
                }

                string fileName = IOHelper.GetUniqueFileName(SiteSettings.BannersPath, file.FileName);
                string filePath = Server.MapPath(SiteSettings.BannersPath);

                filePath = Path.Combine(filePath, fileName);
                GraphicsHelper.SaveOriginalImageWithDefinedDimentions(filePath, fileName, file, 380, 170, ScaleMode.Crop);
                blogItem.BannerImageSrc = fileName;
            }
            else
            {
                blogItem.BannerImageSrc = blogItem.BannerImageSrc ?? "";
            }

            _context.SaveChanges();
            return RedirectToAction("Index");
        }


        public ActionResult Delete(int id)
        {
            var blogItem = _context.BlogItems.First(b => b.Id == id);
            ImageHelper.DeleteImage(blogItem.PreviewImageSrc, SiteSettings.BlogPreviewPath);
            _context.BlogItems.Remove(blogItem);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}
