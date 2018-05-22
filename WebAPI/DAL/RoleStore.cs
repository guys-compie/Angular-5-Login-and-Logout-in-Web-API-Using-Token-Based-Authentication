// Copyright (c) KriaSoft, LLC.  All rights reserved.  See LICENSE.txt in the project root for license information.

using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNet.Identity;

namespace DAL
{
    public class RoleStore : IQueryableRoleStore<UserRole, string>
    {
        private readonly ApplicationDbContext db;

        public RoleStore(ApplicationDbContext db)
        {
            this.db = db;
        }

        //// IQueryableRoleStore<UserRole, TKey>

        public IQueryable<UserRole> Roles
        {
            get
            {
                return this.db.Roles.Select(r => r as UserRole);
            }
        }

        //// IRoleStore<UserRole, TKey>

        public virtual Task CreateAsync(UserRole role)
        {
            if (role == null)
            {
                throw new ArgumentNullException("role");
            }

            this.db.Roles.Add(role);
            return this.db.SaveChangesAsync();
        }

        public Task DeleteAsync(UserRole role)
        {
            if (role == null)
            {
                throw new ArgumentNullException("role");
            }

            this.db.Roles.Remove(role);
            return this.db.SaveChangesAsync();
        }

        public async Task<UserRole> FindByIdAsync(string roleId)
        {
            Role role = await this.db.Roles.FindAsync(new[] { roleId });
            return role as UserRole;
        }

        public async Task<UserRole> FindByNameAsync(string roleName)
        {
            Role role = await this.db.Roles.FirstOrDefaultAsync(r => r.Name == roleName);
            return role as UserRole;
        }

        public Task UpdateAsync(UserRole role)
        {
            if (role == null)
            {
                throw new ArgumentNullException("role");
            }

            this.db.Entry(role).State = EntityState.Modified;
            return this.db.SaveChangesAsync();
        }

        //// IDisposable

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing && this.db != null)
            {
                this.db.Dispose();
            }
        }
    }
}
