﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GreatBrain.DataModel
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class Model1Container : DbContext
    {
        public Model1Container()
            : base("name=Model1Container")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<MainBanner> MainBanner { get; set; }
        public DbSet<ParallaxImage> ParallaxImage { get; set; }
        public DbSet<ContentAnnouncement> ContentAnnouncement { get; set; }
        public DbSet<EducationCountry> EducationCountry { get; set; }
        public DbSet<EducationalInstitution> EducationalInstitution { get; set; }
        public DbSet<EducationalInstitutionImage> EducationalInstitutionImage { get; set; }
        public DbSet<EducationCategory> EducationCategory { get; set; }
        public DbSet<AgeGroup> AgeGroup { get; set; }
        public DbSet<BlogItem> BlogItem { get; set; }
        public DbSet<MapLocation> MapLocation { get; set; }
        public DbSet<Article> Article { get; set; }
        public DbSet<ArticleImage> ArticleImage { get; set; }
        public DbSet<ServiceContent> ServiceContent { get; set; }
        public DbSet<Content> Content { get; set; }
    }
}
