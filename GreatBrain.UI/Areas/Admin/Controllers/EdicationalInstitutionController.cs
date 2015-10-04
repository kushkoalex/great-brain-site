﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GreatBrain.UI.Models;

namespace GreatBrain.UI.Areas.Admin.Controllers
{
    public class EdicationalInstitutionController : AdminController
    {
        private readonly SiteContext _context;

        public EdicationalInstitutionController(SiteContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            return View();
        }

    }
}