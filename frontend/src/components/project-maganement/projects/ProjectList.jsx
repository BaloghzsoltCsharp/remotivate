import {React,  useEffect, useState } from 'react'
import Project  from './Project.jsx'
import './ProjectList.css'
import jwt_decode from "jwt-decode";

const ProjectList = (props) =>
{
    const[isLoading, setIsLoading] = useState("loading")
    const[projects, setProjects] = useState([])
    const[isModified, setIsModified] = useState(false)
    const [manager, setManager]=useState({
            "firstName":"",
            "lastName":""
        })

    const jwtToken = localStorage.getItem("token");
    const userID = jwt_decode(jwtToken).id;
    
    useEffect(()=>
    {
        const getUser=async()=>{
            await fetch(`https://localhost:7029/users/${userID}`)
                .then((resp)=>resp.json())
                .then((resp)=>{setManager(resp)
                    setTimeout(() => {
                    }, 3000);
                })
        }

        async function getProjects() {
            const response = await fetch(`https://localhost:7029/projects`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                alert(message);
                return;
            }

            const result = await response.json();
            setProjects(result)
            setTimeout(() => {
                setIsLoading("done")
            }, 1000);
        }

        getUser()
        getProjects()
    },[props.isSubmit, isModified])

    return (
        <div className="project-list-container">
            {isLoading === "loading" ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                )
                :
                <div >
                    {isLoading === "done" && (
                        <div className='projects-container'>
                            {projects && 
                                projects.map(project => (
                                       <Project key={project.id}
                                                isModified={isModified}
                                                setIsModified={setIsModified}
                                                setIsLoading={setIsLoading}
                                                manager={manager}
                                                project={project}
                                                setIsSubmit={props.setIsSubmit}
                                                IsSubmit={props.isSubmit}
                                       />
                            ))}
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default ProjectList