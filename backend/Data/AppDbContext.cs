using Microsoft.EntityFrameworkCore;
using CapitanCortes.Api.Models;

namespace CapitanCortes.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<ContainerRecord> ContainerRecords => Set<ContainerRecord>();
}