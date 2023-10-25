import React from "react";
import UserList from "../projects/UsersList";

const TaskDetails = (taskItem) =>{
    console.log(taskItem.taskItem);
    return(
        <>
            <div className="task-details-container">
                <div className="task-description">
                    <h2>Task Details</h2>
                    <p>{taskItem.taskItem.description}</p>
                </div>
                <div>
                    <div className="task-id">TaskID: {taskItem.taskItem.id}</div>
                    <div className="date-id">DateID: {taskItem.taskItem.dateId}</div>
                    <div className="task-status">Task Status: {taskItem.taskItem.taskStatus}</div>
                    {taskItem.taskItem.usersOnTask !== null && (
                        <div>
                        <div className="users-title">Users on the Task:</div>
                        {taskItem.taskItem.usersOnTask.map(user=>{
                            return <UserList user={user}/>
                        })}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default TaskDetails;