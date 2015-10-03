using System;
using System.Collections.Generic;

namespace GreatBrain.UI.Models
{
    public partial class EducationCategory
    {
        public EducationCategory()
        {
            this.AgeGroups = new List<AgeGroup>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string Age { get; set; }
        public string AgeEn { get; set; }
        public int SortOrder { get; set; }
        public int EducationCountryId { get; set; }
        public virtual ICollection<AgeGroup> AgeGroups { get; set; }
        public virtual EducationCountry EducationCountry { get; set; }
    }
}
