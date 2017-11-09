using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Entities
{
    public class User
    {
        public User()
        {
            Messages = new List<Message>();
            Chats = new List<Chat>();
            Friends = new List<User>();
        }

        [Key]
        [ForeignKey("ApplicationUser")]
        public string Id { get; set; }
        [Required]
        [MaxLength(25)]
        public string Name { get; set; }
        [Required]
        [MaxLength(25)]
        public string Surname { get; set; }
        [Required]
        [MaxLength(25)]
        public string Sex { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [Column(TypeName = "date")]
        public DateTime BornDate { get; set; }
        [Required]
        [MaxLength(25)]
        public string PhoneNumber { get; set; }    
        [Column(TypeName = "datetime")]
        public DateTime RegistrationDate { get; set; }

        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<Chat> Chats { get; set; }
        public virtual ICollection<User> Friends { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}