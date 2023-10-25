using backend.Models.Entities;

namespace backend.Services.DateServiceLayer
{
    public interface IDateService
    {
         Task<long> CreateDate(long id, string DeadLine, bool forProject);

         Task SetFinishedDate(long DateId);

         Task<Date> GetDateById(long DateId);

        Task ModifyDeadLine(long dateId, string DeadLine);

    }
}
