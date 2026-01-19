public class Teacher : Person
{
    public int SchoolId { get; set; }
    public string Subject { get; set; }
    public List<Course> CoursesTaught { get; set; } = new();
    public override string GetRole() => "Teacher";
}
