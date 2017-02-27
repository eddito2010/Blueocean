using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RepositoryEF;
using System.Data.Entity;
using Interfaces;

namespace Business
{
    public class RepositoryGeneralEF : RepositoryBaseEF, IRepositoryBase
    {
        public RepositoryGeneralEF(bool autoDetectChangesEnabled = false, bool proxyCreationEnabled = false)
            : base(autoDetectChangesEnabled, proxyCreationEnabled)
        {
        }

        #region Patron Singleton

        private static RepositoryGeneralEF instance;
        public static RepositoryGeneralEF GetInstance(bool autoDetectChangesEnabled = false, bool proxyCreationEnabled = false)
        {
            if (instance == null)
                instance = new RepositoryGeneralEF(autoDetectChangesEnabled, proxyCreationEnabled);
            return instance;
        }

        #endregion
    }
}
