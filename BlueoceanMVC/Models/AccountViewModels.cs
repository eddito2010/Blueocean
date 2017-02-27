using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Business;
using Entities;

namespace BlueoceanMVC.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Correo Electrónico")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Contraseña")]
        public string Password { get; set; }

        [Display(Name = "Recordarme")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Correo Electrónico")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "La {0} debe contener como mínimo {2} caracteres.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Contraseña")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmar Contraseña")]
        [Compare("Password", ErrorMessage = "La contraseña y la confirmación de la contraseña no coinciden.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [Display(Name = "Nombres")]
        public string Names { get; set; }

        [Display(Name = "Apellidos")]
        public string LastNames { get; set; }

        [Required]
        [Display(Name = "Identificación")]
        public string Ci { get; set; }

        [Display(Name = "Teléfono Convencional")]
        public string TlfConv { get; set; }

        [Required]
        [Display(Name = "Teléfono Celular")]
        public string TlfCel { get; set; }

        [Display(Name = "Recibir Notificaciones")]
        public bool ReceiveEmail { get; set; }

        [Required]
        [Display(Name = "Ciudad")]
        public int CityId { get; set; }

        [Required]
        [Display(Name = "Provincia")]
        public int StateId { get; set; }

        [Required]
        [Display(Name = "Sexo")]
        public int Sex { get; set; }

        [Required]
        [Display(Name = "Fecha de Nacimiento")]
        public string BirthDate { get; set; }

        [Required]
        [Display(Name = "Calle Principal")]
        public string MainStreet { get; set; }

        [Display(Name = "Calle Secundaria")]
        public string SecondStreet { get; set; }

        [Required]
        [Display(Name = "Número")]
        public string Apartment { get; set; }

        [Display(Name = "Referencia")]
        public string Reference { get; set; }

        [Display(Name = "Es Proveedor")]
        public bool IsProvider { get; set; }

        [Display(Name = "Proveedor")]
        public int ProviderId { get; set; }

        public List<State> States { get; set; }
        public List<City> Cities { get; set; }

        public RegisterViewModel()
        {
            this.States = new List<State>()
            {
                new State()
                {
                    Id = 0,
                    Name = ""
                }
            };
            this.States = (List<State>)RepositoryGeneralEF.GetInstance(false, false).FindAllEntities<State>();
        }

        public IEnumerable<City> GetCities(int stateId)
        {
            var cities = RepositoryGeneralEF.GetInstance(false, false).FindEntitySet<City>(c => c.StateId == stateId);
            this.Cities = cities.ToList();
            return cities;
        }

    }

    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
