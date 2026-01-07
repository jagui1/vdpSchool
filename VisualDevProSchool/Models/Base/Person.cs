public abstract class Person
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public abstract string GetRole();

}