using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GreatBrain.UI.Helpers;
using GreatBrain.UI.Models;

namespace GreatBrain.UI.Areas.Admin.Controllers
{
    public class AgeGroupController : AdminController
    {
        private readonly SiteContext _context;

        public AgeGroupController(SiteContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            var ageGroups = _context.AgeGroups.ToList();
            return View(ageGroups);
        }

        public ActionResult Create()
        {
            ViewBag.EducationCountries = _context.EducationCountries.ToList();
            return View(new AgeGroup { SortOrder = (_context.AgeGroups.Max(c => (int?)c.SortOrder) ?? 0) + 1 });
        }

        [HttpPost]
        public ActionResult Create(AgeGroup model, FormCollection form)
        {
            try
            {
                var ecId = int.Parse(form["EducationCategory"]);
                var educationCategory = _context.EducationCategories.First(c => c.Id == ecId);

                var ec = new AgeGroup
                {
                    Name = model.Name.UpdatePageWebName(),
                    SortOrder = model.SortOrder,
                    EducationCategory = educationCategory,
                    Text = model.Text == null ? "" : HttpUtility.HtmlDecode(model.Text),
                    TextEn = model.TextEn == null ? "" : HttpUtility.HtmlDecode(model.TextEn),
                    Age = model.Age,
                    AgeEn = model.AgeEn
                };
                _context.AgeGroups.Add(ec);
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
            var ageGroup = _context.AgeGroups.First(c => c.Id == id);
            ViewBag.EducationCountries = _context.EducationCountries.ToList();
            return View(ageGroup);
        }

        [HttpPost]
        public ActionResult Edit(int id, AgeGroup model, FormCollection form)
        {
            try
            {
                var ecId = int.Parse(form["EducationCategory"]);
                var educationCategory = _context.EducationCategories.First(c => c.Id == ecId);

                var ec = _context.AgeGroups.First(ea => ea.Id == id);
                ec.SortOrder = model.SortOrder;
                ec.Name = model.Name.UpdatePageWebName();
                ec.EducationCategory = educationCategory;
                ec.Text = model.Text == null ? "" : HttpUtility.HtmlDecode(model.Text);
                ec.TextEn = model.TextEn == null ? "" : HttpUtility.HtmlDecode(model.TextEn);
                ec.Age = model.Age;
                ec.AgeEn = model.AgeEn;
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
            var ag = _context.AgeGroups.First(c => c.Id == id);
            _context.AgeGroups.Remove(ag);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}
