using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace GreatBrain.UI.Models.Mapping
{
    public class ArticleMap : EntityTypeConfiguration<Article>
    {
        public ArticleMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(200);

            this.Property(t => t.Title)
                .HasMaxLength(200);

            this.Property(t => t.TitleEn)
                .HasMaxLength(200);

            this.Property(t => t.ShortDescription)
                .HasMaxLength(200);

            this.Property(t => t.ShortDescriptionEn)
                .HasMaxLength(200);

            this.Property(t => t.Text)
                .HasMaxLength(1073741823);

            this.Property(t => t.TextEn)
                .HasMaxLength(1073741823);

            this.Property(t => t.PreviewImageSrc)
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("Article", "gbua_greatbrain");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Date).HasColumnName("Date");
            this.Property(t => t.Title).HasColumnName("Title");
            this.Property(t => t.TitleEn).HasColumnName("TitleEn");
            this.Property(t => t.ShortDescription).HasColumnName("ShortDescription");
            this.Property(t => t.ShortDescriptionEn).HasColumnName("ShortDescriptionEn");
            this.Property(t => t.Text).HasColumnName("Text");
            this.Property(t => t.TextEn).HasColumnName("TextEn");
            this.Property(t => t.PreviewImageSrc).HasColumnName("PreviewImageSrc");
        }
    }
}
