using System;
using System.Collections.Generic;

namespace GreatBrain.UI.Models
{
    public partial class EducationCountry
    {
        public EducationCountry()
        {
            this.EdicationalInstitutions = new List<EdicationalInstitution>();
            this.EducationCategories = new List<EducationCategory>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string Name { get; set; }
        public int SortOrder { get; set; }
        public virtual ICollection<EdicationalInstitution> EdicationalInstitutions { get; set; }
        public virtual ICollection<EducationCategory> EducationCategories { get; set; }
    }
}
