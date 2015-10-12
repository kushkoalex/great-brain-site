using System.ComponentModel.DataAnnotations;

namespace GreatBrain.UI.Models
{
    [MetadataType(typeof(AgeGroupValidation))]
    public partial class AgeGroup
    {

    }

    public class AgeGroupValidation
    {
        [Display(Name = "Идентификатор страницы")]
        public string Name { get; set; }
        [Display(Name = "Возраст RU")]
        public string Age { get; set; }
        [Display(Name = "Возраст EN")]
        public string AgeEn { get; set; }
        [Display(Name = "Текст RU")]
        public string Text { get; set; }
        [Display(Name = "Текст EN")]
        public string TextEn { get; set; }
        [Display(Name = "Изображение")]
        public string ImageSrc { get; set; }
        [Display(Name = "Порядок отображения")]
        public int SortOrder { get; set; }
    }
}