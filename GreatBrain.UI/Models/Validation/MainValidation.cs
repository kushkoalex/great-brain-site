using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GreatBrain.UI.Models
{
    public class MainValidation
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
        
        
        [Display(Name = "Описание RU")]
        public string Description { get; set; }
        [Display(Name = "Описание EN")]
        public string DescriptionEn { get; set; }
        
        
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