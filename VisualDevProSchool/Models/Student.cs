public class Student : Person
{
    public int GradeLevel { get; set; }
    public List<Course> EnrolledCourses { get; set; } = new();
    public override string GetRole() => "Student";
}
