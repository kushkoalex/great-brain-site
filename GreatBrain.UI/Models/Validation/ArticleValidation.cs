using System;
using System.ComponentModel.DataAnnotations;

namespace GreatBrain.UI.Models
{
    [MetadataType(typeof(ArticleValidation))]
    public partial class Article
    {

    }

    public class ArticleValidation
    {
        [Display(Name = "Идентификатор страницы")]
        public string Name { get; set; }
        [Display(Name = "Дата")]
        public DateTime Date { get; set; }
        [Display(Name = "Заголовок RU")]
        public string Title { get; set; }
        [Display(Name = "Заголовок EN")]
        public string TitleEn { get; set; }
        [Display(Name = "Краткое описание RU")]
        public string ShortDescription { get; set; }
        [Display(Name = "Краткое описание EN")]
        public string ShortDescriptionEn { get; set; }
        [Display(Name = "Текст RU")]
        public string Text { get; set; }
        [Display(Name = "Текст EN")]
        public string TextEn { get; set; }
        [Display(Name = "Изображение превью")]
        public string PreviewImageSrc { get; set; }
    }
}