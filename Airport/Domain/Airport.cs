﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AirportApi.Domain
{
    public class Airport
    {
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }
    }
}
