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

            this.Property(t => t.LocationContent)
                .HasMaxLength(1073741823);

            this.Property(t => t.LocationContentEn)
                .HasMaxLength(1073741823);

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
            this.Property(t => t.LocationContent).HasColumnName("LocationContent");
            this.Property(t => t.LocationContentEn).HasColumnName("LocationContentEn");
            this.Property(t => t.LocationTitle).HasColumnName("LocationTitle");
            this.Property(t => t.LocationTitleEn).HasColumnName("LocationTitleEn");
            this.Property(t => t.SortOrder).HasColumnName("SortOrder");
        }
    }
}
