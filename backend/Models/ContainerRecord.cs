namespace CapitanCortes.Api.Models;

public class ContainerRecord
{
    public int Id { get; set; }
    public string Container { get; set; } = string.Empty;
    public string Client { get; set; } = string.Empty;
    public string Observations { get; set; } = string.Empty;
    public DateTime Start { get; set; }
    public DateTime End { get; set; }

    public double Hours => (End - Start).TotalHours;
}