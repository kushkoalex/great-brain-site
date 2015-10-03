using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace GreatBrain.UI.Models.Mapping
{
    public class MainBannerMap : EntityTypeConfiguration<MainBanner>
    {
        public MainBannerMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.ImageSrc)
                .HasMaxLength(200);

            this.Property(t => t.Title)
                .HasMaxLength(200);

            this.Property(t => t.TitleEn)
                .HasMaxLength(200);

            this.Property(t => t.Description)
                .HasMaxLength(500);

            this.Property(t => t.DescriptionEn)
                .HasMaxLength(500);

            this.Property(t => t.Sign)
                .HasMaxLength(100);

            this.Property(t => t.SignEn)
                .HasMaxLength(100);

            this.Property(t => t.SignImageSrc)
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("MainBanner", "gbua_greatbrain");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.ImageSrc).HasColumnName("ImageSrc");
            this.Property(t => t.Title).HasColumnName("Title");
            this.Property(t => t.TitleEn).HasColumnName("TitleEn");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.DescriptionEn).HasColumnName("DescriptionEn");
            this.Property(t => t.Sign).HasColumnName("Sign");
            this.Property(t => t.SignEn).HasColumnName("SignEn");
            this.Property(t => t.SignImageSrc).HasColumnName("SignImageSrc");
            this.Property(t => t.SortOrder).HasColumnName("SortOrder");
        }
    }
}
