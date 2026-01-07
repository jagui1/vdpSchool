using Microsoft.EntityFrameworkCore;

class SchoolDbContext : DbContext {
    public SchoolDbContext(DbContextOptions<SchoolDbContext> options) : base(options) {}

    public DbSet<Student> Students { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<School> Schools { get; set; }

}