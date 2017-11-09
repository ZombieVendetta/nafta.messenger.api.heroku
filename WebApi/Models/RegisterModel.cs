using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    /// <summary>Register user</summary>
    public class RegisterModel
    {
        /// <summary>User email</summary>
        [Required]
        public string Email { get; set; }

        /// <summary>User password</summary>
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        /// <summary>Confirm user password</summary>
        [Required]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        /// <summary>User name</summary>
        [Required]
        public string Name { get; set; }

        /// <summary>User surname</summary>
        [Required]
        public string Surname { get; set; }

        /// <summary>User gender</summary>
        [Required]
        public string Sex { get; set; }

        /// <summary>User born date</summary>
        [Required]
        [Column(TypeName = "date")]
        public DateTime BornDate { get; set; }

        /// <summary>User phone number</summary>
        [Required]
        [MaxLength(25)]
        public string PhoneNumber { get; set; }

        /// <summary>User registration date</summary>
        [Column(TypeName = "datetime")]
        public DateTime RegistrationDate { get; set; }
    }
}