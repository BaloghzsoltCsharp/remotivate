import React from 'react'
import { useState , useEffect } from 'react'
import './TaskList.css'
import Task from "./Task";
import {useLocation, useParams} from 'react-router-dom';
import jwt_decode from "jwt-decode";

const TaskList = () =>
{
    const params=useParams()
    const [taskItems, setTaskItems] = useState([])
    const [reload,doReload]=useState(false);
    const [deletedItemId, setDeletedItemId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false)
    const [form, setForm] = useState({
        name:"",
        projectId: params.id,
        description: "",
        note: "Empty note",
        taskStatus: 1,
        dateId:null
    })

    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const location = useLocation();
    
    const onSubmit = async (e) => {
        e.preventDefault();
        
        await fetch(`https://localhost:7029/projects/${params.id}/add-task`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })

        setTimeout(() => {
            setShowForm(false)
        }, 2000);
        
        setIsSubmit(true)
    }

    useEffect(() => {
        const getTaskItems = async () => {
            if (location.pathname.startsWith(`/tasks/${params.id}`)) {
                const response = await fetch(
                    `https://localhost:7029/projects/tasks/${params.id}`,{
                        method: 'GET',
                        headers: {
                            'Authorization' : `Bearer ${localStorage.getItem("token")}`,
                        }})
                
                const data = await response.json();
                setTaskItems(data);
            } else if (location.pathname === "/tasks/my-tasks") {
                const response = await fetch("https://localhost:7029/tasks/my-tasks", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization' : `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(decodedToken.id)
                });
                const data = await response.json();
                setTaskItems(data);
            }
        };
        getTaskItems();
    }, [location.pathname, isSubmit, reload]);
    
    const deleteTaskItem = async (id) => {
        setDeletedItemId(id);
        
        setTimeout(() => {
            const remainingItems = taskItems.filter((taskItem) => taskItem.id !== id);
            setTaskItems(remainingItems);
            
        }, 2000);

        await fetch(`https://localhost:7029/tasks/${id}`, {
            method: "DELETE",
            headers: {
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
            
        }});        
    }

    const handleCreateNewTask = () => {
        setShowForm(!showForm)
        setIsSubmit(false)
    }
    
    return (
        <div className="task-list-wrapper">
            <div className="task-list-action-button-container">
                <div className="task-list-search-container">
                    <form className="task-list-search-input-container">
                        {/*<i className="fa fa-search"></i>*/}
                        <input className="task-list-search-input" type="search" placeholder="Search..."/>
                    </form>
                </div>
                <div onClick={handleCreateNewTask} className="add-new-container">
                    <div className="minimize-add-new">
                        <button className="add-new-button"  type="button">
                            <span className="add-new-button-icon">
                                +
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            {showForm ?
                <div className="add-task-form-container">
                    <div>
                        <div>
                            {/*<h2>{toggleSubmit ? "Add Task" : " Edit Task"}</h2>*/}
                        </div>
                        {!isSubmit ?
                            //form can be placed to another component
                            <form onSubmit={onSubmit} className="add-task-form">
                                <label htmlFor="title" className="description-label">
                                    Task Name:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Title"
                                    className="add-task-input"
                                    onChange={(e) => setForm({...form, name: e.target.value})}
                                    // value={inputTitle}
                                />
                                <label className="description-label" htmlFor="description">
                                    Add Description:
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    className="add-task-input"
                                    onChange={(e) => setForm({...form, description: e.target.value})}
                                    // value={inputDesc}
                                />
                                <button className="task-submit-button">Add New Task</button>
                            </form>
                            :
                            <p className="success-message">Task Successfully Created</p>
                        }
                    </div>
                    <div className="close-button-container">
                        <button onClick={() => setShowForm(!showForm)} className="close-button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                : ""
            }
            
            <div className="task-container">
                <table >
                    <thead>
                    <tr className="task-table-header">
                        <th><span className="header-title">Name</span></th>
                        <th><span className="header-title">Description</span></th>
                        <th><span className="header-title">Status</span></th>
                        <th><span className="header-title">Started</span></th>
                        <th><span className="header-title">Expires On</span></th>
                        <th><span className="header-title">Actions</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {taskItems &&
                        taskItems.map((taskItem, key) => {
                            return (
                                // <div className="task-item" key={taskItem.id}>
                                // {deletedItemId === taskItem.id  ? 
                                //     <p className="delete-message">Task Successfully Deleted</p>
                                //      :
                                <Task taskItem={taskItem} deleteTaskItem={deleteTaskItem} doReload={doReload} key={taskItem.id}/>
                                // }
                                // </div>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TaskList