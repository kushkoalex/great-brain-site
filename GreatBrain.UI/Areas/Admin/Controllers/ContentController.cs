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
    public class ContentController : AdminController
    {
        private readonly SiteContext _context;

        public ContentController(SiteContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            var contentList = _context.Contents.ToList();
            return View(contentList);
        }

        public ActionResult Create()
        {
            return View(new Content { SortOrder = (_context.Contents.Max(c => (int?)c.SortOrder) ?? 0) + 1 });
        }

        [HttpPost]
        public ActionResult Create(Content model)
        {
            try
            {
                var content = new Content
                {
                    Name = model.Name.UpdatePageWebName(),
                    Title = model.Title ?? "",
                    TitleEn = model.TitleEn ?? "",
                    Text = model.Text == null ? "" : HttpUtility.HtmlDecode(model.Text),
                    TextEn = model.TextEn == null ? "" : HttpUtility.HtmlDecode(model.TextEn),
                    SortOrder = model.SortOrder
                };
                _context.Contents.Add(content);
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
            var content = _context.Contents.First(c => c.Id == id);
            return View(content);
        }

        [HttpPost]
        public ActionResult Edit(int id, Content model)
        {
            try
            {
                var content = _context.Contents.First(ea => ea.Id == id);
                content.Title = model.Title ?? "";
                content.TitleEn = model.TitleEn ?? "";
                content.Text = model.Text == null ? "" : HttpUtility.HtmlDecode(model.Text);
                content.TextEn = model.TextEn == null ? "" : HttpUtility.HtmlDecode(model.TextEn);
                content.SortOrder = model.SortOrder;
                content.Name = model.Name.UpdatePageWebName();

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
            var content = _context.Contents.First(c => c.Id == id);
            _context.Contents.Remove(content);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}
