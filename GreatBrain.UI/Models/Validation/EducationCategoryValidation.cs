using System.ComponentModel.DataAnnotations;

namespace GreatBrain.UI.Models
{

    [MetadataType(typeof(EducationCategoryValidation))]
    partial class EducationCategory
    {

    }

    public class EducationCategoryValidation
    {
        [Display(Name = "Идентификатор страницы")]
        public string Name { get; set; }
        [Display(Name = "Заголовок RU")]
        public string Title { get; set; }
        [Display(Name = "Заголовок EN")]
        public string TitleEn { get; set; }
        [Display(Name = "Возраст RU")]
        public string Age { get; set; }
        [Display(Name = "Возраст EN")]
        public string AgeEn { get; set; }
        [Display(Name = "Порядок отображения")]
        public int SortOrder { get; set; }
    }
}