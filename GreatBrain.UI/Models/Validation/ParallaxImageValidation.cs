using System.ComponentModel.DataAnnotations;

namespace GreatBrain.UI.Models
{
    [MetadataType(typeof(ParallaxImageValidation))]
    public partial class ParallaxImage
    {

    }
    public class ParallaxImageValidation
    {
        [Display(Name = "Изображение")]
        public string ImageSrc { get; set; }

        [Display(Name = "Порядок отображения")]
        public int SortOrder { get; set; }
    }
}