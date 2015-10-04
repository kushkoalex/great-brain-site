using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GreatBrain.UI.Helpers;
using GreatBrain.UI.Models;

namespace GreatBrain.UI.Areas.Admin.Controllers
{
    public class EducationCountryController : AdminController
    {
        private readonly SiteContext _context;

        public EducationCountryController(SiteContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            var countries = _context.EducationCountries.ToList();
            return View(countries);
        }

        public ActionResult Create()
        {
            return View(new EducationCountry { SortOrder = (_context.EducationCountries.Max(c => (int?)c.SortOrder) ?? 0) + 1 });
        }
        [HttpPost]
        public ActionResult Create(EducationCountry model)
        {
            try
            {
                var country = new EducationCountry
                {
                    Title = model.Title ?? "",
                    TitleEn = model.TitleEn ?? "",
                    Name = model.Name.UpdatePageWebName(),
                    SortOrder = model.SortOrder
                };
                _context.EducationCountries.Add(country);
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
            var country = _context.EducationCountries.First(ea => ea.Id == id);
            return View(country);
        }

        [HttpPost]
        public ActionResult Edit(int id, EducationCountry model)
        {
            try
            {
                var country = _context.EducationCountries.First(ea => ea.Id == id);
                country.Title = model.Title ?? "";
                country.TitleEn = model.TitleEn ?? "";
                country.Name = model.Name.UpdatePageWebName();
                country.SortOrder = model.SortOrder;
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
            var country = _context.EducationCountries.First(ea => ea.Id == id);
            _context.EducationCountries.Remove(country);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}
