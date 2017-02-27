using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Linq.Expressions;
using Interfaces;
using Entities;

namespace RepositoryEF
{
    public class RepositoryBaseEF: IDisposable, IRepositoryBase
    {
        protected DbContext Context = new blueoceanEntities();

        /// <summary>
        /// Constructor que toma como parámetros el contexto de la BD con que va a trabajar y dos elementos de configuración
        /// que se ponen por defecto en false para mejorar el rendimiento de EF
        /// </summary>
        /// <param name="context">Contexto de la BD</param>
        /// <param name="autoDetectChangesEnabled">Propiedad que le indica a EF que no vigile los cambios realizados sobre la entidad
        /// a menos que se lo indiquemos explícitamente</param>
        /// <param name="proxyCreationEnabled">Propiedad que le indica a EF que no cree un proxy de la entidad a menos que se lo
        /// indiquemos explícitamente</param>
        public RepositoryBaseEF(bool autoDetectChangesEnabled = false, bool proxyCreationEnabled = false)
        {
            Context.Configuration.AutoDetectChangesEnabled = autoDetectChangesEnabled;
            Context.Configuration.ProxyCreationEnabled = proxyCreationEnabled;
        }

        /// <summary>
        /// Crea la entidad especificada en la BD
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="newEntity">Entidad a crear</param>
        /// <returns>Retorna la entidad creada</returns>
        public TEntity Create<TEntity>(TEntity newEntity) where TEntity : class
        {
            TEntity Result = null;
            try
            {
                Result = Context.Set<TEntity>().Add(newEntity);
                TrySaveChanges();
            }
            catch(Exception e)
            {
                throw e;
            }

            return Result;
        }

        /// <summary>
        /// Elimina de la BD la entidad especificada
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="deleteEntity">Entidad a eliminar</param>
        /// <returns>Retorna true si pudo eliminar la entidad de la BD, de lo contrario false</returns>
        public bool Delete<TEntity>(TEntity deleteEntity) where TEntity : class
        {
            bool Result = false;
            try
            {
                Context.Set<TEntity>().Attach(deleteEntity);
                Context.Set<TEntity>().Remove(deleteEntity);
                Result = TrySaveChanges() > 0;
            }
            catch (Exception e)
            {
                throw e;
            }

            return Result;
        }

        /// <summary>
        /// Busca y retorna la primera entidad en la BD que cumpla con el criterio especificado
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="criteria">Criterio de selección</param>
        /// <returns>Retorna la primera entidad que cumpla con el criterio especificado</returns>
        public TEntity FindEntity<TEntity>(Expression<Func<TEntity, bool>> criteria) where TEntity : class
        {
            TEntity Result = null;
            try
            {
                Result = Context.Set<TEntity>().FirstOrDefault(criteria);
            }
            catch (Exception e)
            {
                throw e;
            }

            return Result;
        }

        /// <summary>
        /// Busca en la BD y devuelve las entidades que cumplan con un criterio dado
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="criteria">Criterio de Selección</param>
        /// <returns>Retorna la lista de entidades que hayan cumplido con el criterio especificado</returns>
        public IEnumerable<TEntity> FindEntitySet<TEntity>(Expression<Func<TEntity, bool>> criteria) where TEntity : class
        {
            List<TEntity> Result = null;
            try
            {
                Result = Context.Set<TEntity>().Where(criteria).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }

            return Result;
        }

        /// <summary>
        /// Busca en la BD y devuelve todas las entidades del tipo especificado
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <returns>Retorna la lista de entidades que hayan cumplido con el criterio especificado</returns>
        public IEnumerable<TEntity> FindAllEntities<TEntity>() where TEntity : class
        {
            List<TEntity> Result = null;
            try
            {
                Result = Context.Set<TEntity>().ToList();
            }
            catch (Exception e)
            {
                throw e;
            }

            return Result;
        }

        /// <summary>
        /// Actualiza en la BD la entidad especificada
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="modifyEntity">Entidad a modificar</param>
        /// <returns>Retorna true si pudo modificar la entidad en la BD, de lo contrario false</returns>
        public bool Update<TEntity>(TEntity modifyEntity) where TEntity : class
        {
            bool result = false;
            try
            {
                Context.Set<TEntity>().Attach(modifyEntity);
                Context.Entry<TEntity>(modifyEntity).State = EntityState.Modified;
                result = TrySaveChanges() > 0;
            }
            catch (Exception e)
            {
                throw e;
            }

            return result;
        }

        /// <summary>
        /// Destruye los recursos no administrados. En este caso el Context
        /// </summary>
        public void Dispose()
        {
            Context?.Dispose();
        }

        /// <summary>
        /// Intenta salvar los cambios realizados en el contexto
        /// </summary>
        /// <returns>Retorna un entero indicando si la salva fue exitosa donde 0 significa que no pudo realizar los cambios</returns>
        protected virtual int TrySaveChanges()
        {
            return Context.SaveChanges();
        }
    }
}
