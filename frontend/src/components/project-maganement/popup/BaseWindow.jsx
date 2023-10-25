import React, {useState} from 'react';
import "../tasks/Task.css";
import UpdateTask from '../tasks/UpdateTask';
import PopUpAssign  from '../tasks/PopUpAssign';
import PopUpList from '../tasks/PopUpList';
import ProjectPopUpAssign from '../projects/ProjectPopUpAssign';
import ProjectPopUpList from '../projects/ProjectPopUpList';
import ModifyProject from '../projects/ModifyProject'
import ProjectDetails from '../projects/ProjectDetails';
import {Link} from "react-router-dom"
import Task from '../tasks/Task';

const PopUpWindow = ({typeOfPopUp, taskItem,onClose, targetWindow, deleteFunc, props}) =>{
    const [activeWindow, setActiveWindow] = useState(targetWindow)
    
    const handleActiveSelection = (selectedWindow) =>{
        setActiveWindow(selectedWindow);                    
    }  
        
const isValidDate=(dateString)=>{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;
// Parse the date parts to integers
var parts = dateString.split("/");
var day = parseInt(parts[1], 10);
var month = parseInt(parts[0], 10);
var year = parseInt(parts[2], 10);

// Check the ranges of month and year
if(year < 1000 || year > 3000 || month == 0 || month > 12)
    return false;

var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

// Adjust for leap years
if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

// Check the range of the day
return day > 0 && day <= monthLength[month - 1];
}

if(typeOfPopUp ==="Task"){
    const TaskData ={
        Edit: <UpdateTask taskItem={taskItem} isValidDate={isValidDate}/>,
        Assign: <PopUpAssign taskItem={taskItem} />,
        Users: <PopUpList taskItem={taskItem} />,       
    }
    return (
        <>
            <div className={"App task-details-open"}>
                <div className='task-details-popup-wrapper'>
                    <div className="task-details-content task-animate">           
                        <div className="task-details-btn-container">
                            <div>              
                                <button className='single-task-button' onClick={()=>handleActiveSelection('Edit')}>Edit</button>
                                <button className='single-task-button' onClick={()=>handleActiveSelection('Assign')}>Assign</button>
                                <button className='single-task-button' onClick={()=>handleActiveSelection('Users')}>Users</button>
                                <button className='single-task-button' onClick={() => {deleteFunc(taskItem.id)}}>Delete</button>
                            </div>
                            <div>
                                <span onClick={() => onClose()}
                                className="task-details-close">
                                &times;
                                </span>
                            </div>
                        </div>
                        <div className='task-details-container'>
                            {TaskData[activeWindow]}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
else if(typeOfPopUp === "Project"){
    const taskLink=`/tasks/${props.project.id}`;

    
    const ProjectData ={       
        Edit: <ModifyProject isValidDate={isValidDate}
        setIsLoading={props.setIsLoading} isModified={props.isModified}
        setIsModified={props.setIsModified} project={props.project}
        setIsSubmit={props.setIsSubmit} isSubmit={props.isSubmit} toDefault={handleActiveSelection}
         class='modify-project'/>,
        Assign: <ProjectPopUpAssign project={props.project} />,
        Users: <ProjectPopUpList project={props.project} />,
        Project: <ProjectDetails project={props.project}/>,
    }
    
    return (
        <>
            <div className={"App task-details-open"}>
                <div className='task-details-popup-wrapper'>
                    <div className="task-details-content task-animate">           
                        <div className="task-details-btn-container">
                            <div>              
                                <button className='single-task-button' onClick={()=>handleActiveSelection('Project')}>Project</button>
                                <button className='single-task-button' onClick={()=>handleActiveSelection('Edit')}>Edit</button>
                                <button className='single-task-button' onClick={()=>handleActiveSelection('Assign')}>Assign</button>
                                <button className='single-task-button' onClick={()=>handleActiveSelection('Users')}>Users</button>
                                <Link to={taskLink}  role="button">
        <button className='single-project-button' >Tasks</button>
        </Link>
                                <button className='single-task-button' onClick={() => {deleteFunc()}}>Delete</button>
                            </div>
                            <div>
                                <span onClick={() => onClose()}
                                className="task-details-close">
                                &times;
                                </span>
                            </div>
                        </div>
                        <div className='task-details-container'>
                            {ProjectData[activeWindow]}
                        </div>
                    </div>
                </div>
            </div>
    
    
        </>
    )
}

}
export default PopUpWindow;