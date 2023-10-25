import React, { useState } from 'react'
import './Project.css'
import PopUpWindow from '../popup/BaseWindow.jsx'

const Project = (props) => {
    const [showSuccessText, setShowSuccessText] = useState(false)
    const taskLink=`/tasks/${props.project.id}`
    const [showPupUp, setShowPupUp] =useState(false);
    const [targetWindow, setTargetWindow] = useState("");
    const [projectStatus, setProjectStatus]=useState({
    "0":"NotStarted",
    "1":"InProgress",
    "2":"Review",
    "3":"Done"})

    const handleClick=async ()=>{
        await fetch(await fetch(`https://localhost:7029/projects/${props.project.id}`,{
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("token")}`,
            },
        }))
        
        setShowPupUp(false)
        setShowSuccessText(true)
        
        setTimeout(() => {
            setShowPupUp(false)
            props.setIsSubmit(!props.IsSubmit)
            setShowSuccessText(false)
        }, 2000);
    }

    const handleClose=()=>{
        setShowPupUp(false);
    }
    const handlePopUp=(incTarget)=>{
        setTargetWindow(incTarget)
        setShowPupUp(true);
    }

    return(
        <div className="single-project-container">
            <div className="single-project" onClick={()=>handlePopUp('Project')}>
                <div className="single-project-close-button-container">
                    
                <button className="single-project-close-button">&times;</button>
                </div>
                <div className="project-id">Title: {props.project.name}</div>
                <div className="manager"> Manager: {props.manager.firstName} {props.manager.lastName}</div>
                {props.project.usersOnProject.length !== null && (
                    <div className="users">
                        <div className="users-title">Users in the project: {props.project.usersOnProject.length+1}</div>
                        
                    </div>
                )}
                <div className="project-status">Project Status: {projectStatus[props.project.projectStatus]}</div>
                <button className="see-more-button">See More</button>
            </div>
            {showPupUp ?  <PopUpWindow typeOfPopUp="Project" targetWindow={targetWindow} onClose={handleClose} deleteFunc={handleClick} props={props}></PopUpWindow> : "" }                     
            {showSuccessText ? 
                            <div className="project-details-content animate">
                                <p className="project-delete-message">Project Successfully Deleted</p>
                            </div>
                            :
                            <div className="project-details-content animate">
             
                                
                                

                                
                            </div>
                        }
        </div>
    )
}


export default Project