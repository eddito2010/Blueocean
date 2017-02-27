using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business;
using System.Data.Entity;
using System.Security.Cryptography;
using Tools;
using Entities;

namespace ConsoleTesting
{
    class Program
    {
        static void Main(string[] args)
        {
            var md5 = MD5.Create();
            var newUser = new Entities.User
            {
                Names = "Eduardo",
                LastNames = "Sánchez Sánchez",
                Ci = "1757015209",
                Email = "eddito2010@gmail.com",
                TlfCel = "0983754824",
                PasswordHash = Cryptography.GetMd5Hash(md5, "eddito2010"),
                ReceiveEmail = true,
                Role = Enums.Roles.Admin,
                StatesId = 17,
                CitiesId = 21,
                Sex = Enums.Sex.M,
                BirthDate = Convert.ToDateTime("16/03/1976"),
                MainStreet = "Asunción",
                SecondStreet = "Panamá",
                Apartment = "Oe6-53"
            };

            //var result = UserBL.GetInstance().InsertUser(newUser);

            //var userList = UserBL.GetInstance().GetUsers();
            //foreach (var user in userList)
            //{
            //    Console.WriteLine(user.Names + " " + user.LastNames);
            //}

            var tempPassword = Tools.Cryptography.GetMd5Hash(md5, "eddito2010");
            var user = UserBL.GetInstance().GetUser(u => u.Password == tempPassword);
            Console.WriteLine(user.Names + " " + user.LastNames);

            Console.ReadKey();
        }
    }
}
