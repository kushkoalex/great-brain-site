using System;
using System.Collections.Generic;

namespace GreatBrain.UI.Models
{
    public partial class ParallaxImage
    {
        public int Id { get; set; }
        public string ImageSrc { get; set; }
        public int SortOrder { get; set; }
    }
}
