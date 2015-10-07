using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace GreatBrain.UI.Models.Mapping
{
    public class MapLocationMap : EntityTypeConfiguration<MapLocation>
    {
        public MapLocationMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Title)
                .HasMaxLength(200);

            this.Property(t => t.TitleEn)
                .HasMaxLength(200);

            this.Property(t => t.LocationContentAddress)
                .HasMaxLength(200);

            this.Property(t => t.LocationContentAddressEn)
                .HasMaxLength(200);

            this.Property(t => t.LocationContentPhone)
                .HasMaxLength(200);

            this.Property(t => t.LocationContentEmail)
                .HasMaxLength(200);

            this.Property(t => t.LocationTitle)
                .HasMaxLength(200);

            this.Property(t => t.LocationTitleEn)
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("MapLocation", "gbua_greatbrain");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Title).HasColumnName("Title");
            this.Property(t => t.TitleEn).HasColumnName("TitleEn");
            this.Property(t => t.LicationLat).HasColumnName("LicationLat");
            this.Property(t => t.LocationLng).HasColumnName("LocationLng");
            this.Property(t => t.LocationContentAddress).HasColumnName("LocationContentAddress");
            this.Property(t => t.LocationContentAddressEn).HasColumnName("LocationContentAddressEn");
            this.Property(t => t.LocationContentPhone).HasColumnName("LocationContentPhone");
            this.Property(t => t.LocationContentEmail).HasColumnName("LocationContentEmail");
            this.Property(t => t.LocationTitle).HasColumnName("LocationTitle");
            this.Property(t => t.LocationTitleEn).HasColumnName("LocationTitleEn");
            this.Property(t => t.SortOrder).HasColumnName("SortOrder");
        }
    }
}
