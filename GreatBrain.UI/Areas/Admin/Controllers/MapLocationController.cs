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
    public class MapLocationController : AdminController
    {
        private readonly SiteContext _context;

        public MapLocationController(SiteContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            return View(_context.MapLocations.ToList());
        }

        public ActionResult Create()
        {
            return View(new MapLocation() { SortOrder = (_context.MapLocations.Max(c => (int?)c.SortOrder) ?? 0) + 1 });
        }

        [HttpPost]
        public ActionResult Create(MapLocation model)
        {
            try
            {
                var mapLocation = new MapLocation
                {
                    Title = model.Title ?? "",
                    TitleEn = model.TitleEn ?? "",
                    LocationLat = model.LocationLat,
                    LocationLng = model.LocationLng,
                    LocationContentAddress = model.LocationContentAddress,
                    LocationContentAddressEn = model.LocationContentAddressEn,
                    LocationContentEmail = model.LocationContentEmail,
                    LocationContentPhone = model.LocationContentPhone,
                    LocationTitle = model.LocationTitle,
                    LocationTitleEn = model.LocationTitleEn,
                    SortOrder = model.SortOrder
                };

                _context.MapLocations.Add(mapLocation);
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
            var mapLocation = _context.MapLocations.First(c => c.Id == id);
            return View(mapLocation);
        }

        [HttpPost]
        public ActionResult Edit(int id, MapLocation model)
        {
            var mapLocation = _context.MapLocations.First(a => a.Id == model.Id);
            mapLocation.Title = model.Title ?? "";
            mapLocation.TitleEn = model.TitleEn ?? "";
            mapLocation.LocationLat = model.LocationLat;
            mapLocation.LocationLng = model.LocationLng;
            mapLocation.LocationContentAddress = model.LocationContentAddress;
            mapLocation.LocationContentAddressEn = model.LocationContentAddressEn;
            mapLocation.LocationContentEmail = model.LocationContentEmail;
            mapLocation.LocationContentPhone = model.LocationContentPhone;
            mapLocation.LocationTitle = model.LocationTitle;
            mapLocation.LocationTitleEn = model.LocationTitleEn;
            mapLocation.SortOrder = model.SortOrder;

            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult Delete(int id)
        {
            var mapLocation = _context.MapLocations.First(b => b.Id == id);
            _context.MapLocations.Remove(mapLocation);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}
