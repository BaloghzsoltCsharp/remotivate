import React, { useState,useEffect } from 'react'
import Status from '../status/Status'

const UpdateTask = ({ taskItem,isValidDate }) =>
{
    const [showSuccessText, setShowSuccessText] = useState(false)
    
    const [form,setForm] = useState (
        {
            "id": taskItem.id,
            "name":taskItem.name,
            "description":taskItem.description,
            "taskStatus":taskItem.taskStatus,
            "dateId":taskItem.dateId,
            "projectId":taskItem.projectId
        })
        
    const [deadLine,setDeadLine]=useState(
        {
            "deadline":""
        })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        console.log(taskItem)

        if(taskItem.dateId!==null && deadLine.deadline!=="")
        {
            if(isValidDate(deadLine.deadline))
            {
                    await fetch(`https://localhost:7029/dates/${taskItem.dateId}`,{
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(deadLine.deadline)
                    })
            }
            else{
                alert("Incorrect Date")
            }
        }
    else if(taskItem.dateId===null && deadLine.deadline!==""){
       
        const resp = await fetch(`https://localhost:7029/dates/tasks/${taskItem.id}`,{
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deadLine.deadline)
            })
            const data=await resp.json()
            form.dateId=data
            console.log(data)
    }

    await fetch(`https://localhost:7029/task/${taskItem.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        setShowSuccessText(true)

        setTimeout(() => {

            setShowSuccessText(false)
        }, 2000);
        
    }
    
    useEffect(()=>{
    },[showSuccessText])


const setStatus=(status)=>{
    setForm({...form, taskStatus: parseInt(status)})
}

    return (
        <div className="update-project-container">
            <div className="update-project-form-container">
                {showSuccessText ?
                    <p className="project-delete-message">Task Successfully Updated</p>
                    :
                    <form className="update-project-form" onSubmit={handleSubmit}>
                        <h2>Edit Task</h2>
                        <input className="update-project-input" id="description"
                               placeholder='Name'
                               onChange={(e) => setForm({...form, name: e.target.value})}
                        />
                        <input className="update-project-input" id="description"
                               placeholder='Description'
                               onChange={(e) => setForm({...form, description: e.target.value})}
                        />
                        <input className="update-project-input" id="deadline"
                               placeholder='DD/MM/YYYY'
                               onChange={(e) => setDeadLine({deadline: e.target.value})}
                        />
                        <Status setStatus={setStatus} status={taskItem.taskStatus}/>

                        <button className="update-project-submit-button" type="submit">Save</button>
                    </form>
                }
            </div>
        </div>
    )
}

export default UpdateTask