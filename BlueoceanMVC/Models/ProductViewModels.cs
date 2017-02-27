using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueoceanMVC.Models
{
    public class ProductViewModels
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal Iva { get; set; }
        public decimal Discount { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public decimal Score { get; set; }
        public int Stock { get; set; }
        public bool HasColor { get; set; }
        public bool HasSize { get; set; }
        public DateTime DateAdmission { get; set; }
        public decimal Weight { get; set; }
        public string UmWeight { get; set; }
        public string Simensions { get; set; }
        public string Packaging { get; set; }
        public string ChargedBy { get; set; }
    }
}