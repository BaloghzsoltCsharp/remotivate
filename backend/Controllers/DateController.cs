using backend.Models.Entities;
using backend.Services.DateServiceLayer;
using backend.Services.ProjectServiceLayer;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController, Route("/dates")]
    public class DateController : ControllerBase
    {
        private readonly IDateService _dateService;

        public DateController(IDateService dateService)
        {
            _dateService = dateService;
        }

        [HttpGet("{id}")]
        public async Task<Date> GetDateById(long id)
        {
            return await _dateService.GetDateById(id);
        }

        [HttpPost("project/{id}")]
        public async Task<long> CreateDateForProject(long id, [FromBody] string deadline)
        {
            return await _dateService.CreateDate(id, deadline, true);
        }

        [HttpPost("tasks/{id}")]
        public async Task<long> CreateDateForTask(long id, [FromBody] string deadline)
        {
           return await _dateService.CreateDate(id, deadline, false);
        }


        [HttpPut("{dateId:long}")]
        public async Task ModifyDeadLine(long dateId, [FromBody] string deadline)
        {
            await _dateService.ModifyDeadLine(dateId, deadline);
        }
    }
}
