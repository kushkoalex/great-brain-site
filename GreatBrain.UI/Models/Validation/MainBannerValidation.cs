using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GreatBrain.UI.Models
{
    [MetadataType(typeof(MainBannerValidation))]
    partial class MainBanner
    {

    }

    public class MainBannerValidation
    {
        [Display(Name = "Заголовок RU")]
        public string Title { get; set; }

        [Display(Name = "Заголовок EN")]
        public string TitleEn { get; set; }

        [Display(Name = "Основное изображение")]
        public string ImageSrc { get; set; }

        [Display(Name = "Подпись RU")]
        public string Sign { get; set; }

        [Display(Name = "Подпись EN")]
        public string SignEn { get; set; }

        [Display(Name = "Изображение подписи")]
        public string SignImageSrc { get; set; }

        [Display(Name = "Порядок отображения")]
        public int SortOrder { get; set; }

        [Display(Name = "Описание RU")]
        public string Description { get; set; }

        [Display(Name = "Описание EN")]
        public string DescriptionEn { get; set; }
    }
}