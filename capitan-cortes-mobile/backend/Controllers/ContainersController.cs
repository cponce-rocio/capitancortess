using Microsoft.AspNetCore.Mvc;
using CapitanCortes.Api.Data;
using CapitanCortes.Api.Models;

namespace CapitanCortes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContainersController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContainersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.ContainerRecords.ToList());
    }

    [HttpPost]
    public IActionResult Create(ContainerRecord record)
    {
        _context.ContainerRecords.Add(record);
        _context.SaveChanges();

        return Ok(record);
    }
}