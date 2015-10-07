using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace GreatBrain.UI.Models.Mapping
{
    public class EducationalInstitutionImageMap : EntityTypeConfiguration<EducationalInstitutionImage>
    {
        public EducationalInstitutionImageMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.ImageSrc)
                .IsRequired()
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("EducationalInstitutionImage", "gbua_greatbrain");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.ImageSrc).HasColumnName("ImageSrc");
            this.Property(t => t.EdicationalInstitutionId).HasColumnName("EdicationalInstitutionId");

            // Relationships
            this.HasRequired(t => t.EducationalInstitution)
                .WithMany(t => t.EducationalInstitutionImages)
                .HasForeignKey(d => d.EdicationalInstitutionId);

        }
    }
}
