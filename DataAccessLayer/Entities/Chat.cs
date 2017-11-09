using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Entities
{
    public class Chat
    {
        public Chat()
        {
            Messages = new List<Message>();
            Users = new List<User>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(25)]
        public string Name { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime CreationDate { get; set; }

        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}