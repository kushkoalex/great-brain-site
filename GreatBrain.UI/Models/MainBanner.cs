using System;
using System.Collections.Generic;

namespace GreatBrain.UI.Models
{
    public partial class MainBanner
    {
        public int Id { get; set; }
        public string ImageSrc { get; set; }
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string Description { get; set; }
        public string DescriptionEn { get; set; }
        public string Sign { get; set; }
        public string SignEn { get; set; }
        public string SignImageSrc { get; set; }
        public int SortOrder { get; set; }
    }
}
