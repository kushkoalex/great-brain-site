using System;
using System.Collections.Generic;

namespace GreatBrain.UI.Models
{
    public partial class EducationalInstitutionImage
    {
        public int Id { get; set; }
        public string ImageSrc { get; set; }
        public int EdicationalInstitutionId { get; set; }
        public virtual EdicationalInstitution EdicationalInstitution { get; set; }
    }
}
