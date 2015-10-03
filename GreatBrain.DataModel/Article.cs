//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GreatBrain.DataModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class Article
    {
        public Article()
        {
            this.ArticleImages = new HashSet<ArticleImage>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public System.DateTime Date { get; set; }
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