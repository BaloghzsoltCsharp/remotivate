import React,{ useState,useEffect } from 'react'
import './Task.css'
import PopUpAssign from "./PopUpAssign";
import PopUpList from "./PopUpList";
import UserList from "../projects/UsersList";
import UpdateTask from "./UpdateTask";
import Status from '../status/Status'
import Date from '../date/Date'
import PopUpWindow from "../popup/BaseWindow";
const Task = ({taskItem, deleteTaskItem}) => {
    const [showPupUp, setShowPupUp] =useState(false);
    const [targetWindow, setTargetWindow] = useState("");

    const handleClose=()=>{
        setShowPupUp(false);
    }
    const handlePopUp=(incTarget)=>{
        setTargetWindow(incTarget)
        setShowPupUp(true);
    }
    const [date,setDate]=useState(
        {
            "createdDate":"",
            "deadLine":""
        }
    );


    


    useEffect(()=>{
const setNewDate=(date)=>{
setDate({
    createdDate:date.createdDate,
    deadLine:date.deadLine
})
}

    const getDates=async()=>{
        await fetch(`https://localhost:7029/dates/${taskItem.dateId}`)
            .then((resp)=>resp.json())
            .then((resp)=>{setNewDate(resp)
                setTimeout(() => {
                }, 3000);
            })
    }

    getDates()
   
},[ ])


    return (
        <>
            <tr className="task-content" >
                <td >
                    <p>{taskItem.name}</p>
                </td>
                <td>
                    <p>{taskItem.description}</p>
                </td>
                <td>
                {
                                                            taskItem.taskStatus === 1 ? "In Progress"
                                                                : taskItem.taskStatus === 2 ? "Review"
                                                                    : taskItem.taskStatus === 3 ? "Done" 
                                                                        : "Not Started"
                                                        }
                </td>
                <td>{date.createdDate}</td>
                <td>{date.deadLine}</td>
                <td>                    
                    <div className="task-button-container">
                        <div className="task-show-more-button">
                            <div className="task-action-button" onClick={()=>handlePopUp('Edit')}>Edit</div>
                        </div>
                        <div className="task-show-more-button">
                            <div className="task-action-button" onClick={()=>handlePopUp('Assign')}>Assign</div>
                        </div>
                        <div className="task-show-more-button">
                            <div className="task-action-button" onClick={()=>handlePopUp('Users')}>Users</div>
                        </div>
                        <div className="task-show-more-button">
                        <div className="task-action-icon" onClick={() => {deleteTaskItem(taskItem.id)}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"/>
                            </svg>
                        </div>
                            
                            
                            {/*
                            <span className="task-action-icon" onClick={()=>handlePopUp('Task')}>
                                &#xFE19;</span>*/}
                        </div>
                        <div className="task-action-icon" onClick={() => {deleteTaskItem(taskItem.id)}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"/>
                            </svg>
                        </div>
                    </div>
                </td>
            </tr>        
            {showPupUp ?  <PopUpWindow typeOfPopUp="Task" taskItem={taskItem} targetWindow={targetWindow} onClose={handleClose} deleteFunc={deleteTaskItem}></PopUpWindow> : "" }          
        </>
    )
}

export default Task