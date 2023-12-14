using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Data.SqlClient;




namespace WebFox.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Sqli : ControllerBase
    {

        private readonly ILogger<Sqli> _logger;

        public Sqli(ILogger<Sqli> logger)
        {
            _logger = logger;
        }


        
[HttpGet("{id}")]
public string DoSqli(string id)
{
    string conString = "I AM a connection String";
    using (SqlConnection con = new SqlConnection(conString))
    {
        con.Open();
        using (SqlCommand cmd = new SqlCommand("SELECT * FROM users WHERE userId = @Id", con))
        {
            cmd.Parameters.AddWithValue("@Id", id);
            SqlDataReader reader = cmd.ExecuteReader();
            string res = "";
            while (reader.Read())
            {
                res += reader["userName"];
            }
            return res;
        }
    }
}

    }
}