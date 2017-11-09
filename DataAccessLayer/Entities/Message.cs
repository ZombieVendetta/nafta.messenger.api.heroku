using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Entities
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Text { get; set; }
                
        public string UserId { get; set; }
        public int ChatId { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime Time { get; set; }

        public virtual Chat Chat { get; set; }
        public virtual User User { get; set; }
    }
}