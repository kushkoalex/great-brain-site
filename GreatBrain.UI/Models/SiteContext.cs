using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using GreatBrain.UI.Models.Mapping;

namespace GreatBrain.UI.Models
{
    public partial class SiteContext : DbContext
    {
        static SiteContext()
        {
            Database.SetInitializer<SiteContext>(null);
        }

        public SiteContext()
            : base("Name=SiteContext")
        {
        }

        public DbSet<AgeGroup> AgeGroups { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleImage> ArticleImages { get; set; }
        public DbSet<BlogItem> BlogItems { get; set; }
        public DbSet<Content> Contents { get; set; }
        public DbSet<ContentAnnouncement> ContentAnnouncements { get; set; }
        public DbSet<EducationalInstitution> EducationalInstitutions { get; set; }
        public DbSet<EducationalInstitutionImage> EducationalInstitutionImages { get; set; }
        public DbSet<EducationCategory> EducationCategories { get; set; }
        public DbSet<EducationCountry> EducationCountries { get; set; }
        public DbSet<MainBanner> MainBanners { get; set; }
        public DbSet<MapLocation> MapLocations { get; set; }
        public DbSet<ParallaxImage> ParallaxImages { get; set; }
        public DbSet<ServiceContent> ServiceContents { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new AgeGroupMap());
            modelBuilder.Configurations.Add(new ArticleMap());
            modelBuilder.Configurations.Add(new ArticleImageMap());
            modelBuilder.Configurations.Add(new BlogItemMap());
            modelBuilder.Configurations.Add(new ContentMap());
            modelBuilder.Configurations.Add(new ContentAnnouncementMap());
            modelBuilder.Configurations.Add(new EducationalInstitutionMap());
            modelBuilder.Configurations.Add(new EducationalInstitutionImageMap());
            modelBuilder.Configurations.Add(new EducationCategoryMap());
            modelBuilder.Configurations.Add(new EducationCountryMap());
            modelBuilder.Configurations.Add(new MainBannerMap());
            modelBuilder.Configurations.Add(new MapLocationMap());
            modelBuilder.Configurations.Add(new ParallaxImageMap());
            modelBuilder.Configurations.Add(new ServiceContentMap());
        }
    }
}
