//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class Shipping
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string PurchaseCode { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string TlfConv { get; set; }
        public string TlfCel { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string MainStreet { get; set; }
        public string SecondStreet { get; set; }
        public string Apartment { get; set; }
        public string Reference { get; set; }
        public string Observaciones { get; set; }
    
        public virtual User User { get; set; }
    }
}
