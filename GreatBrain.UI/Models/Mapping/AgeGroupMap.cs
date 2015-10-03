using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace GreatBrain.UI.Models.Mapping
{
    public class AgeGroupMap : EntityTypeConfiguration<AgeGroup>
    {
        public AgeGroupMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(200);

            this.Property(t => t.Age)
                .HasMaxLength(100);

            this.Property(t => t.AgeEn)
                .HasMaxLength(100);

            this.Property(t => t.Text)
                .HasMaxLength(1073741823);

            this.Property(t => t.TextEn)
                .HasMaxLength(1073741823);

            this.Property(t => t.ImageSrc)
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("AgeGroup", "gbua_greatbrain");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Age).HasColumnName("Age");
            this.Property(t => t.AgeEn).HasColumnName("AgeEn");
            this.Property(t => t.Text).HasColumnName("Text");
            this.Property(t => t.TextEn).HasColumnName("TextEn");
            this.Property(t => t.ImageSrc).HasColumnName("ImageSrc");
            this.Property(t => t.SortOrder).HasColumnName("SortOrder");
            this.Property(t => t.EducationCategoryId).HasColumnName("EducationCategoryId");

            // Relationships
            this.HasRequired(t => t.EducationCategory)
                .WithMany(t => t.AgeGroups)
                .HasForeignKey(d => d.EducationCategoryId);

        }
    }
}
