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
    
    public partial class EducationalInstitutionImage
    {
        public int Id { get; set; }
        public string ImageSrc { get; set; }
        public int EdicationalInstitutionId { get; set; }
    
        public virtual EdicationalInstitution EdicationalInstitution { get; set; }
    }
}
