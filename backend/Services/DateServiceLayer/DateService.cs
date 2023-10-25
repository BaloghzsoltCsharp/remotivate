using backend.Data;
using backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.DateServiceLayer
{
    public class DateService : IDateService
    {
        private readonly RemotivateContext _context;

        public DateService(RemotivateContext context)
        {
            _context = context;
        }

        public async Task<long> CreateDate(long id, string DeadLine, bool forProject)
        {
            Date date;
            if (forProject)
            {
                date = new()
                {
                    ProjectId = id,
                    CreatedDate = DateTime.Now.ToString("dd/MM/yyyy"),
                    DeadLine = DeadLine
                };
                 _context.Dates.Add(date);
                await _context.SaveChangesAsync();
                Date createdDate = await _context.Dates.FirstAsync(date => date.ProjectId == id);
                Console.WriteLine(createdDate.Id+"  "+id);
                return createdDate.Id;
            }
            else
            {
                date = new()
                {
                    TaskId = id,
                    CreatedDate = DateTime.Now.ToString("dd/MM/yyyy"),
                    DeadLine = DeadLine
                };
                _context.Dates.Add(date);
                await _context.SaveChangesAsync();
                Date createdDate = await _context.Dates.FirstAsync(date => date.TaskId == id);
                return createdDate.Id;
            }
        }
        public async Task SetFinishedDate(long DateId)
        {
            Date date = await _context.Dates.FirstAsync(d => d.Id == DateId);
            _context.Entry(date).Property(d => d.CompletedOn).CurrentValue = DateTime.Now.ToString("dd/MM/yyyy");
            await _context.SaveChangesAsync();
        }


        public async Task<Date> GetDateById(long DateId)
        {
            return  await _context.Dates.FirstAsync(date => date.Id == DateId);
        }

        public async Task ModifyDeadLine(long dateId, string DeadLine)
        {
            Date date = await _context.Dates.FirstAsync(d => d.Id == dateId);
            _context.Entry(date).Property(d => d.DeadLine).CurrentValue = DeadLine;
            await _context.SaveChangesAsync();
        }

    }
}
