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
        string query = "SELECT * FROM users WHERE userId = @id";
        using (SqlCommand cmd = new SqlCommand(query, con))
        {
            // Use a parameterized query to avoid SQL injection
            cmd.Parameters.AddWithValue("@id", id);
            
            con.Open();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
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
}