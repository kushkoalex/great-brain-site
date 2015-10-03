using System;
using System.Collections.Generic;

namespace GreatBrain.UI.Models
{
    public partial class AgeGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public string AgeEn { get; set; }
        public string Text { get; set; }
        public string TextEn { get; set; }
        public string ImageSrc { get; set; }
        public int SortOrder { get; set; }
        public int EducationCategoryId { get; set; }
        public virtual EducationCategory EducationCategory { get; set; }
    }
}
