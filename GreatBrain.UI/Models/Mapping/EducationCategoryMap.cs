using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace GreatBrain.UI.Models.Mapping
{
    public class EducationCategoryMap : EntityTypeConfiguration<EducationCategory>
    {
        public EducationCategoryMap()
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

            this.Property(t => t.Age)
                .HasMaxLength(100);

            this.Property(t => t.AgeEn)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("EducationCategory", "gbua_greatbrain");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Title).HasColumnName("Title");
            this.Property(t => t.TitleEn).HasColumnName("TitleEn");
            this.Property(t => t.Age).HasColumnName("Age");
            this.Property(t => t.AgeEn).HasColumnName("AgeEn");
            this.Property(t => t.SortOrder).HasColumnName("SortOrder");
            this.Property(t => t.EducationCountryId).HasColumnName("EducationCountryId");

            // Relationships
            this.HasRequired(t => t.EducationCountry)
                .WithMany(t => t.EducationCategories)
                .HasForeignKey(d => d.EducationCountryId);

        }
    }
}
