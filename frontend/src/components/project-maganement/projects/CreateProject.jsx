import React, { useState } from 'react'
import './CreateProject.css'

const CreateProject = (props) =>
{
    const [showSuccessText, setShowSuccessText] = useState(false)
    const [Form,setForm]=useState(
        {
        "ManagerId":parseInt(props.user),
        "ProjectName":"",
        "Description": "",
        "ProjectStatus": 0
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(Form)
       
            await fetch('https://localhost:7029/projects', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Form)
            })
            setShowSuccessText(true)

            setTimeout(() => {
                props.setShowForm(!props.showForm)
                setShowSuccessText(false)
            }, 2000);

            props.setIsSubmit(!props.isSubmit)
            props.changeOption("none")
        
    }
    console.log(props.loggedInUser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    return (
        <div className="add-task-form-container">
            <div>
                {showSuccessText ?
                   props.loggedInUser && props.loggedInUser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin'
                        || props.loggedInUser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'ProjectManager'
                        ?
                        <p className="success-message">Project Successfully Created</p> 
                        :   
                        <p className="success-message error-message">You dont have permission to create a project</p>
                    :
                    <form onSubmit={handleSubmit} className="add-task-form">

                        <input id="ProjectName"
                               placeholder='Project Name'
                               className="add-task-input"
                               onChange={(e) => setForm({...Form, ProjectName: e.target.value})}
                        ></input>
                        <input id="Description"
                               placeholder='Description'
                               className="add-task-input"
                               onChange={(e) => setForm({...Form, Description: e.target.value})}
                        ></input>
                        <button className="task-submit-button">Create Project</button>
                    </form>
                }
            </div>
            <div className="close-button-container">
                <button onClick={() => props.setShowForm(!props.showForm)} className="close-button">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    )
}

export default CreateProject