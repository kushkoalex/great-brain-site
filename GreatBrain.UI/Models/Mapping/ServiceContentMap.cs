using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace GreatBrain.UI.Models.Mapping
{
    public class ServiceContentMap : EntityTypeConfiguration<ServiceContent>
    {
        public ServiceContentMap()
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

            this.Property(t => t.ServiceType)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("ServiceContent", "gbua_greatbrain");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Title).HasColumnName("Title");
            this.Property(t => t.TitleEn).HasColumnName("TitleEn");
            this.Property(t => t.ServiceType).HasColumnName("ServiceType");
            this.Property(t => t.IsSpecial).HasColumnName("IsSpecial");
            this.Property(t => t.SortOrder).HasColumnName("SortOrder");
        }
    }
}
