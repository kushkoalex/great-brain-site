using System.ComponentModel.DataAnnotations;

namespace GreatBrain.UI.Models
{
    [MetadataType(typeof(ContentValidation))]
    partial class Content
    {

    }

    public class ContentValidation
    {
        [Display(Name = "Идентификатор страницы")]
        public string Name { get; set; }

        [Display(Name = "Заголовок RU")]
        public string Title { get; set; }

        [Display(Name = "Заголовок EN")]
        public string TitleEn { get; set; }

        [Display(Name = "Заголовок в меню RU")]

        public string MenuTitle { get; set; }

        [Display(Name = "Заголовок в меню EN")]
        public string MenuTitleEn { get; set; }

        [Display(Name = "Текст RU")]
        public string Text { get; set; }

        [Display(Name = "Текст EN")]
        public string TextEn { get; set; }

        [Display(Name = "Порядок отображения")]
        public int SortOrder { get; set; }
    }
}