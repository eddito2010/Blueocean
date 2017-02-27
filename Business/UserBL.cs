using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Entities;


namespace Business
{
    public class UserBL
    {
        #region Patron Singleton

        private static UserBL instance;
        public static UserBL GetInstance()
        {
            if (instance == null)
                instance = new UserBL();
            return instance;
        }

        #endregion

        #region Métodos

        /// <summary>
        /// Listado de todos los usuarios
        /// </summary>
        /// <returns>Devuelve todos los usuarios existentes</returns>
        public List<User> GetUsers()
        {
            using (var db = new blueoceanEntities())
            {
                return db.Users.ToList();
            }
        }

        /// <summary>
        /// Listado de usuarios que cumplan con un criterio
        /// </summary>
        /// <param name="criteria">Criterio de Selección</param>
        /// <returns>Retorna el listado de usuarios que cumplan con un criterio</returns>
        public List<User> GetUsers(Expression<Func<User, bool>>criteria)
        {
            using (var db = new blueoceanEntities())
            {
                return db.Users.Where(criteria).ToList();
            }
        }

        /// <summary>
        /// Devuelve el usuario que tenga el ID especificado
        /// </summary>
        /// <param name="id">ID del usuario a buscar</param>
        /// <returns>Retorna el usuario con el ID especificado</returns>
        public User GetUser(string id)
        {
            using (var db = new blueoceanEntities())
            {
                return db.Users.FirstOrDefault(u => u.UserId == id);
            }
        }

        /// <summary>
        /// Devuelve el usuario que cumpla con el criterio especificado
        /// </summary>
        /// <param name="criteria">Criterio de búsqueda</param>
        /// <returns>Retorna el usuario que cumpla con el criterio especificado</returns>
        public User GetUser(Expression<Func<User, bool>>criteria)
        {
            using (var db = new blueoceanEntities())
            {
                return db.Users.FirstOrDefault(criteria);
            }
        }

        /// <summary>
        /// Inserta un nuevo usuario en la BD
        /// </summary>
        /// <param name="newUser">Entidad del usuario a insertar</param>
        /// <returns>Retorna un entero mayor que 0 si pudo insertar, de lo contrario 0</returns>
        public int InsertUser(User newUser)
        {
            using (var db = new blueoceanEntities())
            {
                db.Users.Add(newUser);
                return db.SaveChanges();
            }
        }

        #endregion

    }
}
