using System;
using System.Collections.Generic;

namespace GreatBrain.UI.Models
{
    public partial class EducationalInstitution
    {
        public EducationalInstitution()
        {
            this.EducationalInstitutionImages = new List<EducationalInstitutionImage>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string LocationName { get; set; }
        public string LocationTitle { get; set; }
        public string LocationTitleEn { get; set; }
        public string Gender { get; set; }
        public string Type { get; set; }
        public string PreviewImageSrc { get; set; }
        public string Address { get; set; }
        public string AddressEn { get; set; }
        public string MapLocation { get; set; }
        public string MinAge { get; set; }
        public string YearOfFoundation { get; set; }
        public string NumberOfStudents { get; set; }
        public string RectorName { get; set; }
        public string RectorNameEn { get; set; }
        public string Contacts { get; set; }
        public string ContactsEn { get; set; }
        public string Email { get; set; }
        public string WebSiteUrl { get; set; }
        public string Description { get; set; }
        public string DescriptionEn { get; set; }
        public string LogoImageSrc { get; set; }
        public int SortOrder { get; set; }
        public bool IsSpecial { get; set; }
        public int EducationCountryId { get; set; }
        public virtual ICollection<EducationalInstitutionImage> EducationalInstitutionImages { get; set; }
        public virtual EducationCountry EducationCountry { get; set; }
    }
}
