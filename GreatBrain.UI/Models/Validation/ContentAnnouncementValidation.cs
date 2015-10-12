using System.ComponentModel.DataAnnotations;

namespace GreatBrain.UI.Models
{

    [MetadataType(typeof(ContentAnnouncementValidation))]
    public partial class ContentAnnouncement
    {

    }


    public class ContentAnnouncementValidation
    {

        [Display(Name = "Заголовок RU")]
        public string Title { get; set; }

        [Display(Name = "Заголовок EN")]
        public string TitleEn { get; set; }

        [Display(Name = "Текст RU")]
        public string Text { get; set; }

        [Display(Name = "Текст EN")]
        public string TextEn { get; set; }

        [Display(Name = "Изображение")]
        public string ImageSrc { get; set; }

        [Display(Name = "Адрес страницы")]
        public string Url { get; set; }

        [Display(Name = "Порядок отображения")]
        public int SortOrder { get; set; } 
    }
}