using System.ComponentModel.DataAnnotations;

namespace GreatBrain.UI.Models
{
    [MetadataType(typeof(ServiceContentValidation))]
    partial class ServiceContent
    {

    }

    public class ServiceContentValidation
    {
        [Display(Name = "Идентификатор страницы")]
        public string Name { get; set; }
        [Display(Name = "Заголовок RU")]
        public string Title { get; set; }
        [Display(Name = "Заголовок EN")]
        public string TitleEn { get; set; }
        [Display(Name = "Текст RU")]
        public string Text { get; set; }
        [Display(Name = "Текст EN")]
        public string TextEn { get; set; }
        [Display(Name = "Тип сервиса")]
        public string ServiceType { get; set; }
        [Display(Name = "Специальный")]
        public bool IsSpecial { get; set; }
        [Display(Name = "Порядок отображения")]
        public int SortOrder { get; set; }
    }
}