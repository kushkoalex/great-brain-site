using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GreatBrain.UI.Models
{
    [MetadataType(typeof(EducationCountryValidation))]
    partial class EducationCountry
    {

    }

    public class EducationCountryValidation
    {
        [Display(Name = "Буквенный идентификатор")]
        public string Name { get; set; }

        [Display(Name = "Название страны RU")]
        public string Title { get; set; }

        [Display(Name = "Название страны EN")]
        public string TitleEn { get; set; }

        [Display(Name = "Порядок отображения")]
        public int SortOrder { get; set; }


    }
}