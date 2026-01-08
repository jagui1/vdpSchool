using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
});

// Adds database context to the dependency Injection
builder.Services.AddDbContext<SchoolDbContext>(opt => opt.UseInMemoryDatabase("VDPSchool"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Swagger Middleware
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "VDPSchoolAPI";
    config.Title = "VDPSchoolAPI v1";
    config.Version = "v1";
});
var app = builder.Build();


// Runtime seeding 
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SchoolDbContext>();

    if (!context.Schools.Any())
    {
        var businessCourse = new Course { CourseName = "Business 101" };
        var csharpCourse = new Course { CourseName = "C# 101" };
        var angularCourse = new Course { CourseName = "Angular 101" };

        var teacherMurphy = new Teacher
        {
            FullName = "Mr. Murphy",
            Email = "murphy@vdp.edu",
            Subject = "Computer Science",
            CoursesTaught = { csharpCourse, angularCourse }
        };

        var teacherBaltimore = new Teacher
        {
            FullName = "Mr. Baltimore",
            Email = "baltimore@vdp.edu",
            Subject = "Business",
            CoursesTaught = { businessCourse }
        };

        var studentJeremy = new Student
        {
            FullName = "Jeremy A",
            Email = "agui1@vdp.edu",
            GradeLevel = 17,
            EnrolledCourses = { businessCourse, csharpCourse, angularCourse }
        };

        var school = new School
        {
            Name = "VDP University",
            Address = "San Antonio, TX",
            Students = { studentJeremy },
            Teachers = { teacherMurphy, teacherBaltimore },
            Courses = { businessCourse, csharpCourse, angularCourse }
        };


        context.Schools.Add(school);

        businessCourse = new Course { CourseName = "Business 201" };
        csharpCourse = new Course { CourseName = "C# 201" };
        angularCourse = new Course { CourseName = "Angular 201" };

        teacherMurphy = new Teacher
        {
            FullName = "Senor Murphy",
            Email = "murphy@ehs.edu",
            Subject = "Computer Science",
            CoursesTaught = { csharpCourse, angularCourse }
        };

        teacherBaltimore = new Teacher
        {
            FullName = "Senor Baltimore",
            Email = "baltimore@ehs.edu",
            Subject = "Business",
            CoursesTaught = { businessCourse }
        };

        studentJeremy = new Student
        {
            FullName = "Jeremy B",
            Email = "agui1@ehs.edu",
            GradeLevel = 17,
            EnrolledCourses = { businessCourse, csharpCourse, angularCourse }
        };

        school = new School
        {
            Name = "EHS University",
            Address = "San Antonio, TX",
            Students = { studentJeremy },
            Teachers = { teacherMurphy, teacherBaltimore },
            Courses = { businessCourse, csharpCourse, angularCourse }
        };


        context.Schools.Add(school);

        context.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "VDPSchoolAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.UseHttpsRedirection();
app.UseCors("FrontendPolicy");

var vdpSchool = app.MapGroup("/vdpschool");

app.MapGet("/", () => "Hello Cruel World!");
vdpSchool.MapGet("/schools/", GetAllSchools);
vdpSchool.MapPost("/schools", CreateSchool);
vdpSchool.MapGet("/schools/{id}", GetSchool);
vdpSchool.MapPut("schools/{id}", UpdateSchool);
vdpSchool.MapDelete("schools/{id}", DeleteSchool);

app.Run();

static async Task<IResult> CreateSchool(School school, SchoolDbContext db) {
    db.Schools.Add(school);
    await db.SaveChangesAsync();

    return TypedResults.Created($"/schools/{school.Id}", school);
}

static async Task<IResult> GetAllSchools(SchoolDbContext db) {
    var schools = await db.Schools
        .Include(s => s.Teachers)
            .ThenInclude(t => t.CoursesTaught)
        .Include(s => s.Students)
            .ThenInclude(st => st.EnrolledCourses)
        .Include(s => s.Courses)
        .ToArrayAsync();

    return TypedResults.Ok(schools);
}

static async Task<IResult> GetSchool(int id, SchoolDbContext db) {
    var school = await db.Schools
        .Include(s => s.Teachers)
            .ThenInclude(t => t.CoursesTaught)
        .Include(s => s.Students)
            .ThenInclude(st => st.EnrolledCourses)
        .Include(s => s.Courses)
        .FirstOrDefaultAsync(s => s.Id == id);

    return school is not null
        ? TypedResults.Ok(school)
        : TypedResults.NotFound();
}

static async Task<IResult> UpdateSchool(int id, School updatedSchool, SchoolDbContext db)
{
    // Load existing school with nested objects
    var school = await db.Schools
        .Include(s => s.Teachers)
            .ThenInclude(t => t.CoursesTaught)
        .Include(s => s.Students)
            .ThenInclude(st => st.EnrolledCourses)
        .Include(s => s.Courses)
        .FirstOrDefaultAsync(s => s.Id == id);

    if (school == null)
        return TypedResults.NotFound();

    // Update scalar properties
    school.Name = updatedSchool.Name;
    school.Address = updatedSchool.Address;

    foreach (var updatedCourse in updatedSchool.Courses)
    {
        var existingCourse = school.Courses.FirstOrDefault(c => c.Id == updatedCourse.Id);
        if (existingCourse != null)
            existingCourse.CourseName = updatedCourse.CourseName;
    }

    foreach (var updatedTeacher in updatedSchool.Teachers)
    {
        var existingTeacher = school.Teachers.FirstOrDefault(t => t.Id == updatedTeacher.Id);
        if (existingTeacher != null)
            existingTeacher.FullName = updatedTeacher.FullName;
    }

    // Save changes
    await db.SaveChangesAsync();

    return TypedResults.Ok(school);
}

static async Task<IResult> DeleteSchool(int id, SchoolDbContext db)
{
    if (await db.Schools.FindAsync(id) is School school)
    {
        db.Schools.Remove(school);
        await db.SaveChangesAsync();
        return TypedResults.NoContent();
    }

    return TypedResults.NotFound();
}
