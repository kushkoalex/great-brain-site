using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace GreatBrain.UI.Models.Mapping
{
    public class ContentAnnouncementMap : EntityTypeConfiguration<ContentAnnouncement>
    {
        public ContentAnnouncementMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Title)
                .HasMaxLength(200);

            this.Property(t => t.TitleEn)
                .HasMaxLength(200);

            this.Property(t => t.Text)
                .HasMaxLength(1073741823);

            this.Property(t => t.TextEn)
                .HasMaxLength(1073741823);

            this.Property(t => t.ImageSrc)
                .HasMaxLength(200);

            this.Property(t => t.Url)
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("ContentAnnouncement", "gbua_greatbrain");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Title).HasColumnName("Title");
            this.Property(t => t.TitleEn).HasColumnName("TitleEn");
            this.Property(t => t.Text).HasColumnName("Text");
            this.Property(t => t.TextEn).HasColumnName("TextEn");
            this.Property(t => t.ImageSrc).HasColumnName("ImageSrc");
            this.Property(t => t.Url).HasColumnName("Url");
            this.Property(t => t.SortOrder).HasColumnName("SortOrder");
        }
    }
}
