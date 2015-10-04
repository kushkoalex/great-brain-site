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
    public class ContentAnnouncementController : AdminController
    {
        private readonly SiteContext _context;

        public ContentAnnouncementController(SiteContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            var announcements = _context.ContentAnnouncements.ToList();
            return View(announcements);
        }

        public ActionResult Create()
        {
            return View(new ContentAnnouncement { SortOrder = (_context.ContentAnnouncements.Max(c => (int?)c.SortOrder) ?? 0) + 1 });
        }

        [HttpPost]
        public ActionResult Create(ContentAnnouncement model)
        {
            try
            {
                var ca = new ContentAnnouncement
                {
                    Title = model.Title ?? "",
                    TitleEn = model.TitleEn ?? "",
                    Text = model.Text == null ? "" : HttpUtility.HtmlDecode(model.Text),
                    TextEn = model.TextEn == null ? "" : HttpUtility.HtmlDecode(model.TextEn),
                    Url = model.Url ?? "",
                    SortOrder = model.SortOrder
                };


                var file = Request.Files[0];
                if (file != null && !string.IsNullOrEmpty(file.FileName))
                {
                    string fileName = IOHelper.GetUniqueFileName(SiteSettings.ContentAnouncementImagePath, file.FileName);
                    string filePath = Server.MapPath(SiteSettings.ContentAnouncementImagePath);

                    filePath = Path.Combine(filePath, fileName);
                    GraphicsHelper.SaveOriginalImage(filePath, fileName, file, 0);

                    ca.ImageSrc = fileName;
                }
                else
                {
                    ca.ImageSrc = ca.ImageSrc ?? "";
                }


                _context.ContentAnnouncements.Add(ca);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {

                return View();
            }
        }

        public ActionResult Edit(int id)
        {
            var contentAnnouncement = _context.ContentAnnouncements.First(ea => ea.Id == id);
            return View(contentAnnouncement);
        }

        [HttpPost]
        public ActionResult Edit(int id, ContentAnnouncement model)
        {
            try
            {
                var ca = _context.ContentAnnouncements.First(ea => ea.Id == id);
                ca.Title = model.Title ?? "";
                ca.TitleEn = model.TitleEn ?? "";
                ca.Text = model.Text == null ? "" : HttpUtility.HtmlDecode(model.Text);
                ca.TextEn = model.TextEn == null ? "" : HttpUtility.HtmlDecode(model.TextEn);
                ca.Url = model.Url;
                ca.SortOrder = model.SortOrder;


                var file = Request.Files[0];

                    if (file != null && !string.IsNullOrEmpty(file.FileName))
                    {

                        if (!string.IsNullOrEmpty(ca.ImageSrc))
                        {
                            ImageHelper.DeleteImage(ca.ImageSrc,SiteSettings.ContentAnouncementImagePath);
                        }

                        string fileName = IOHelper.GetUniqueFileName(SiteSettings.ContentAnouncementImagePath, file.FileName);
                        string filePath = Server.MapPath(SiteSettings.ContentAnouncementImagePath);

                        filePath = Path.Combine(filePath, fileName);
                        GraphicsHelper.SaveOriginalImage(filePath, fileName, file, 0);

                        ca.ImageSrc = fileName;
                    }
                    else
                    {
                        ca.ImageSrc = ca.ImageSrc ?? "";
                    }
                

                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        public ActionResult Delete(int id)
        {
            var ca = _context.ContentAnnouncements.First(ea => ea.Id == id);
            ImageHelper.DeleteImage(ca.ImageSrc, SiteSettings.ContentAnouncementImagePath);
            _context.ContentAnnouncements.Remove(ca);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}
