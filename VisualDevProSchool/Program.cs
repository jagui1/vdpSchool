using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Adds database context to the dependency Injection
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Swagger Middleware
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "TodoAPI";
    config.Title = "TodoAPI v1";
    config.Version = "v1";
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "TodoAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

var vdpSchool = app.MapGroup("/vdpschool");

app.MapGet("/", () => "Hello Cruel World!");

vdpSchool.MapPost("/todoitems", CreateTodo);
vdpSchool.MapGet("/todoitems/{id}", GetTodo);

app.Run();

static async Task<IResult> CreateTodo(Todo todo, TodoDb db) {
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return TypedResults.Created($"/todoitems/{todo.Id}", todo);
}

static async Task<IResult> GetTodo(int id, TodoDb db) {
    return await db.Todos.FindAsync(id)
        is Todo todo
            ? TypedResults.Ok(todo)
            : TypedResults.NotFound();
}
