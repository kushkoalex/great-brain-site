using System;
using System.Collections.Generic;

namespace GreatBrain.UI.Models
{
    public partial class MapLocation
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public decimal LicationLat { get; set; }
        public decimal LocationLng { get; set; }
        public string LocationContentAddress { get; set; }
        public string LocationContentAddressEn { get; set; }
        public string LocationContentPhone { get; set; }
        public string LocationContentEmail { get; set; }
        public string LocationTitle { get; set; }
        public string LocationTitleEn { get; set; }
        public int SortOrder { get; set; }
    }
}
