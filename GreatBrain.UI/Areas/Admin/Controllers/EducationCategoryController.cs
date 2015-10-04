using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services.Description;
using GreatBrain.UI.Helpers;
using GreatBrain.UI.Models;

namespace GreatBrain.UI.Areas.Admin.Controllers
{
    public class EducationCategoryController : AdminController
    {
        private readonly SiteContext _context;

        public EducationCategoryController(SiteContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            var educationCategories = _context.EducationCategories.ToList();
            return View(educationCategories);
        }

        public ActionResult Create()
        {
            ViewBag.EducationCountries = _context.EducationCountries.ToList();
            return View(new EducationCategory { SortOrder = (_context.EducationCategories.Max(c => (int?)c.SortOrder) ?? 0) + 1 });
        }

        [HttpPost]
        public ActionResult Create(EducationCategory model, FormCollection form)
        {
            try
            {
                var ecId = int.Parse(form["EducationCountry"]);
                var educationCountry = _context.EducationCountries.First(c => c.Id == ecId);

                var ec = new EducationCategory
                {
                    Name = model.Name.UpdatePageWebName(),
                    Title = model.Title ?? "",
                    TitleEn = model.TitleEn ?? "",
                    SortOrder = model.SortOrder,
                    EducationCountry = educationCountry,
                    Age = model.Age,
                    AgeEn = model.AgeEn
                };
                _context.EducationCategories.Add(ec);
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
            var category = _context.EducationCategories.First(c => c.Id == id);
            ViewBag.EducationCountries = _context.EducationCountries.ToList();
            return View(category);
        }

        [HttpPost]
        public ActionResult Edit(int id, EducationCategory model, FormCollection form)
        {
            try
            {
                var ecId = int.Parse(form["EducationCountry"]);
                var educationCountry = _context.EducationCountries.First(c => c.Id == ecId);

                var ec = _context.EducationCategories.First(ea => ea.Id == id);
                ec.Title = model.Title ?? "";
                ec.TitleEn = model.TitleEn ?? "";
                ec.SortOrder = model.SortOrder;
                ec.Name = model.Name.UpdatePageWebName();
                ec.EducationCountry = educationCountry;
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
            var ec = _context.EducationCategories.First(c => c.Id == id);
            _context.EducationCategories.Remove(ec);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}
