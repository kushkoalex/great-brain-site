using System;
using System.Collections.Generic;

namespace GreatBrain.UI.Models
{
    public partial class ServiceContent
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string Text { get; set; }
        public string TextEn { get; set; }
        public string ServiceType { get; set; }
        public bool IsSpecial { get; set; }
        public int SortOrder { get; set; }
    }
}
