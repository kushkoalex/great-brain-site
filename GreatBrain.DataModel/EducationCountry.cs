//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class EducationCountry
    {
        public EducationCountry()
        {
            this.EdicationalInstitutions = new HashSet<EdicationalInstitution>();
            this.EducationCategories = new HashSet<EducationCategory>();
        }
    
        public int Id { get; set; }
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string Name { get; set; }
        public int SortOrder { get; set; }
    
        public virtual ICollection<EdicationalInstitution> EdicationalInstitutions { get; set; }
        public virtual ICollection<EducationCategory> EducationCategories { get; set; }
    }
}