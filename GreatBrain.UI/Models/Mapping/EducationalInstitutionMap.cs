using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace GreatBrain.UI.Models.Mapping
{
    public class EducationalInstitutionMap : EntityTypeConfiguration<EducationalInstitution>
    {
        public EducationalInstitutionMap()
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

            this.Property(t => t.LocationName)
                .IsRequired()
                .HasMaxLength(200);

            this.Property(t => t.LocationTitle)
                .HasMaxLength(200);

            this.Property(t => t.LocationTitleEn)
                .HasMaxLength(200);

            this.Property(t => t.Gender)
                .HasMaxLength(10);

            this.Property(t => t.Type)
                .HasMaxLength(50);

            this.Property(t => t.PreviewImageSrc)
                .HasMaxLength(200);

            this.Property(t => t.Address)
                .HasMaxLength(200);

            this.Property(t => t.AddressEn)
                .HasMaxLength(200);

            this.Property(t => t.MapLocation)
                .HasMaxLength(200);

            this.Property(t => t.MinAge)
                .HasMaxLength(200);

            this.Property(t => t.YearOfFoundation)
                .HasMaxLength(200);

            this.Property(t => t.NumberOfStudents)
                .HasMaxLength(200);

            this.Property(t => t.RectorName)
                .HasMaxLength(200);

            this.Property(t => t.RectorNameEn)
                .HasMaxLength(200);

            this.Property(t => t.Contacts)
                .HasMaxLength(200);

            this.Property(t => t.ContactsEn)
                .HasMaxLength(200);

            this.Property(t => t.Email)
                .HasMaxLength(200);

            this.Property(t => t.WebSiteUrl)
                .HasMaxLength(200);

            this.Property(t => t.Description)
                .HasMaxLength(1073741823);

            this.Property(t => t.DescriptionEn)
                .HasMaxLength(1073741823);

            this.Property(t => t.LogoImageSrc)
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("EducationalInstitution", "gbua_greatbrain");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Title).HasColumnName("Title");
            this.Property(t => t.TitleEn).HasColumnName("TitleEn");
            this.Property(t => t.LocationName).HasColumnName("LocationName");
            this.Property(t => t.LocationTitle).HasColumnName("LocationTitle");
            this.Property(t => t.LocationTitleEn).HasColumnName("LocationTitleEn");
            this.Property(t => t.Gender).HasColumnName("Gender");
            this.Property(t => t.Type).HasColumnName("Type");
            this.Property(t => t.PreviewImageSrc).HasColumnName("PreviewImageSrc");
            this.Property(t => t.Address).HasColumnName("Address");
            this.Property(t => t.AddressEn).HasColumnName("AddressEn");
            this.Property(t => t.MapLocation).HasColumnName("MapLocation");
            this.Property(t => t.MinAge).HasColumnName("MinAge");
            this.Property(t => t.YearOfFoundation).HasColumnName("YearOfFoundation");
            this.Property(t => t.NumberOfStudents).HasColumnName("NumberOfStudents");
            this.Property(t => t.RectorName).HasColumnName("RectorName");
            this.Property(t => t.RectorNameEn).HasColumnName("RectorNameEn");
            this.Property(t => t.Contacts).HasColumnName("Contacts");
            this.Property(t => t.ContactsEn).HasColumnName("ContactsEn");
            this.Property(t => t.Email).HasColumnName("Email");
            this.Property(t => t.WebSiteUrl).HasColumnName("WebSiteUrl");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.DescriptionEn).HasColumnName("DescriptionEn");
            this.Property(t => t.LogoImageSrc).HasColumnName("LogoImageSrc");
            this.Property(t => t.SortOrder).HasColumnName("SortOrder");
            this.Property(t => t.IsSpecial).HasColumnName("IsSpecial");
            this.Property(t => t.EducationCountryId).HasColumnName("EducationCountryId");
            this.Property(t => t.BannerImageSrc).HasColumnName("BannerImageSrc");
            this.Property(t => t.ShowAsBanner).HasColumnName("ShowAsBanner");

            // Relationships
            this.HasRequired(t => t.EducationCountry)
                .WithMany(t => t.EdicationalInstitutions)
                .HasForeignKey(d => d.EducationCountryId);

        }
    }
}
