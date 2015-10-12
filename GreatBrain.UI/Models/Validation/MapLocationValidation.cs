using System.ComponentModel.DataAnnotations;

namespace GreatBrain.UI.Models
{
    [MetadataType(typeof(MapLocationValidation))]
    public partial class MapLocation
    {

    }
    public class MapLocationValidation
    {
        [Display(Name = "Заголовок RU")]
        public string Title { get; set; }
        [Display(Name = "Заголовок EN")]
        public string TitleEn { get; set; }
        [Display(Name = "Latitude (Широта)")]
        public string LocationLat { get; set; }
        [Display(Name = "Longitude (Долгота)")]
        public string LocationLng { get; set; }
        [Display(Name = "Адрес RU")]
        public string LocationContentAddress { get; set; }
        [Display(Name = "Адрес EN")]
        public string LocationContentAddressEn { get; set; }
        [Display(Name = "Телефон")]
        public string LocationContentPhone { get; set; }
        [Display(Name = "Email")]
        public string LocationContentEmail { get; set; }
        [Display(Name = "Заголовок точки на карте RU")]
        public string LocationTitle { get; set; }
        [Display(Name = "Заголовок точки на карте EN")]
        public string LocationTitleEn { get; set; }
        [Display(Name = "Порядок отображения")]
        public int SortOrder { get; set; }
    }
}