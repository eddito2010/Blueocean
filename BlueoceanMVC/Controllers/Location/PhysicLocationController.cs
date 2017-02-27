using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using BlueoceanMVC.Models;
using Business;
using Entities;
using Newtonsoft.Json;

namespace BlueoceanMVC.Controllers.Location
{
    public class PhysicLocationController : Controller
    {
        [Route("{controller}/{action}/{stateId}")]
        public ActionResult GetCitiesFromStates(int stateId)
        {
            var Cities = new RegisterViewModel().GetCities(stateId);
            return Json(Cities, JsonRequestBehavior.AllowGet);
        }
    }
}