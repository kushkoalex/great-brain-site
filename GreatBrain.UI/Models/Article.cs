using System;
using System.Collections.Generic;

namespace GreatBrain.UI.Models
{
    public partial class Article
    {
        public Article()
        {
            this.ArticleImages = new List<ArticleImage>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string ShortDescription { get; set; }
        public string ShortDescriptionEn { get; set; }
        public string Text { get; set; }
        public string TextEn { get; set; }
        public string PreviewImageSrc { get; set; }
        public virtual ICollection<ArticleImage> ArticleImages { get; set; }
    }
}
