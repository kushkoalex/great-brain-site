using System;
using System.Collections.Generic;

namespace GreatBrain.UI.Models
{
    public partial class ContentAnnouncement
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string Text { get; set; }
        public string TextEn { get; set; }
        public string ImageSrc { get; set; }
        public string Url { get; set; }
        public int SortOrder { get; set; }
    }
}
