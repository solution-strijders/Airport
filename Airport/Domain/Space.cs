using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AirportApi.Domain
{
    public class Space
    {
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        public enum SpaceType
        {
            Restaurant,
            Shop
        }
    }
}
