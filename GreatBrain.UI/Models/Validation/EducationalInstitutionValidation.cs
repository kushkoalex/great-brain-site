using System.ComponentModel.DataAnnotations;

namespace GreatBrain.UI.Models
{
    [MetadataType(typeof(EducationalInstitutionValidation))]
    partial class EducationalInstitution
    {

    }

    public class EducationalInstitutionValidation
    {
        [Display(Name = "Идентификатор страницы")]
        public string Name { get; set; }
        [Display(Name = "Заголовок RU")]
        public string Title { get; set; }
        [Display(Name = "Заголовок EN")]
        public string TitleEn { get; set; }
        [Display(Name = "Идентификатор расположения заведения")]
        public string LocationName { get; set; }
        [Display(Name = "Расположение заведения RU")]
        public string LocationTitle { get; set; }
        [Display(Name = "Расположение заведения EN")]
        public string LocationTitleEn { get; set; }
        [Display(Name = "Пол обучаемых")]
        public string Gender { get; set; }
        [Display(Name = "Тип заведения")]
        public string Type { get; set; }
        [Display(Name = "Изображение")]
        public string PreviewImageSrc { get; set; }
        [Display(Name = "Адрес RU")]
        public string Address { get; set; }
        [Display(Name = "Адрес EN")]
        public string AddressEn { get; set; }
        [Display(Name = "Расположение на карте")]
        public string MapLocation { get; set; }
        [Display(Name = "Минимальный возраст")]
        public string MinAge { get; set; }
        [Display(Name = "Год основания")]
        public string YearOfFoundation { get; set; }
        [Display(Name = "Количество учащихся")]
        public string NumberOfStudents { get; set; }
        [Display(Name = "Ректор RU")]
        public string RectorName { get; set; }
        [Display(Name = "Ректор EN")]
        public string RectorNameEn { get; set; }
        [Display(Name = "Контактная информация RU")]
        public string Contacts { get; set; }
        [Display(Name = "Контактная информация EN")]
        public string ContactsEn { get; set; }
        [Display(Name = "Email")]
        public string Email { get; set; }
        [Display(Name = "Адрес вэб-страницы")]
        public string WebSiteUrl { get; set; }
        [Display(Name = "Описание RU")]
        public string Description { get; set; }
        [Display(Name = "Описание EN")]
        public string DescriptionEn { get; set; }
        [Display(Name = "Логотип учебного заведения")]
        public string LogoImageSrc { get; set; }
        [Display(Name = "Порядок отображения")]
        public int SortOrder { get; set; }
        [Display(Name = "Специальное предложение")]
        public bool IsSpecial { get; set; }
        [Display(Name = "Изображение баннера")]
        public string BannerImageSrc { get; set; }
        [Display(Name = "Отображать баннер")]
        public string ShowAsBanner { get; set; }
    }
}