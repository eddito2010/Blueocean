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
    
    public partial class Product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Product()
        {
            this.Carts = new HashSet<Cart>();
            this.Colors = new HashSet<Color>();
            this.Comments = new HashSet<Comment>();
            this.Favorites = new HashSet<Favorite>();
            this.ProductsDetails = new HashSet<ProductsDetail>();
            this.ProductsImages = new HashSet<ProductsImage>();
            this.Scores = new HashSet<Score>();
            this.Sizes = new HashSet<Size>();
        }
    
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public Nullable<int> ProviderId { get; set; }
        public decimal Iva { get; set; }
        public int Discount { get; set; }
        public int CategoryId { get; set; }
        public Nullable<int> SubCategoryId { get; set; }
        public int Stock { get; set; }
        public int Score { get; set; }
        public int BillerId { get; set; }
        public bool HasColor { get; set; }
        public bool HasSize { get; set; }
        public string Modulus { get; set; }
        public Nullable<int> MarkId { get; set; }
        public System.DateTime DateAdmission { get; set; }
        public Nullable<decimal> Weight { get; set; }
        public string UmWeight { get; set; }
        public string Dimensions { get; set; }
        public string Packaging { get; set; }
        public string ChargedBy { get; set; }
    
        public virtual Biller Biller { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual Category Category { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Color> Colors { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Comment> Comments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual Mark Mark { get; set; }
        public virtual Provider Provider { get; set; }
        public virtual User User { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductsDetail> ProductsDetails { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductsImage> ProductsImages { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Score> Scores { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Size> Sizes { get; set; }
    }
}
