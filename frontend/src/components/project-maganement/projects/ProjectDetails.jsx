import React, { useState,useEffect } from 'react'
import UserList from './UsersList';
import Date from '../date/Date'
const ProjectDetails = (props) =>{
    const [dates,setDates]=useState()
    const [manager, setManager]=useState({
        "firstName":"",
        "lastName":""
    })
    useEffect(()=>
    {
        const getUser=async()=>{
            await fetch(`https://localhost:7029/users/${props.project.managerId}`)
                .then((resp)=>resp.json())
                .then((resp)=>{setManager(resp)
                    setTimeout(() => {
                    }, 3000);
                })
        }
        const getDates=async()=>{
            await fetch(`https://localhost:7029/dates/${props.project.dateId}`)
                .then((resp)=>resp.json())
                .then((resp)=>{setDates(resp)
                    setTimeout(() => {
                    }, 3000);
                })
        }
        getDates()
        getUser()

    },[ ])
    return(
        <>
        <div className="project-details-container">
                                    <div className="project-description">
                                        <h1 className='projectDetailsHeader'>Details</h1>
                                        <p className="projectDescriptionParagraph">{props.project.description}
                                        </p>
                                    </div>
                                    <div className="project-details">
                                        <div className="project-id">Title: {props.project.name}</div>
                                        <div className="manager"> Manager: {manager.firstName} {manager.lastName}</div>
                        {dates!==undefined && <Date date={dates}/>}
                                        {props.project.usersOnProject !== null && (
                                            <div className="users">
                                                <div className="users-title">Users in the project: {props.project.usersOnProject.map(user => {
                                                    return <UserList user={user}/>
                                                })}</div>

                                            </div>
                                        )}
                                        <div className="project-status">Project Status:
                                        {
                                            props.project.projectStatus === 1 ? " In Progress"
                                                : props.project.projectStatus === 2 ? " Review"
                                                    : props.project.projectStatus === 3 ? " Done" 
                                                        : " Not Started"
                                        }
                                        
                                        </div>
                                    </div>
                                </div>
        </>
    )
}
export default ProjectDetails;
