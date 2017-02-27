using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace Interfaces
{
    public interface IRepositoryBase
    {
        TEntity Create<TEntity>(TEntity newEntity) where TEntity : class;
        bool Delete<TEntity>(TEntity deleteEntity) where TEntity : class;
        TEntity FindEntity<TEntity>(Expression<Func<TEntity, bool>> criteria) where TEntity : class;
        IEnumerable<TEntity> FindEntitySet<TEntity>(Expression<Func<TEntity, bool>> criteria) where TEntity : class;
        IEnumerable<TEntity> FindAllEntities<TEntity>() where TEntity : class;
        bool Update<TEntity>(TEntity modifyEntity) where TEntity : class;
    }
}
