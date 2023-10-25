import React from 'react'
import './Status.css'
const Status = ({setStatus,status}) =>
{
    

return(
<div className='status-dropdown-container'>
    <label>
<select className="status-dropdown" 
placeholder='Not Started'
onChange={(e) => setStatus(e.target.value)}
>
                        <option value='0' selected={status===0?"selected":""}>Not Started</option>
                        <option value='1' selected={status===1?"selected":""}>In Progress</option>
                        <option value='2' selected={status===2?"selected":""}>Review</option>
                        <option value='3' selected={status===3?"selected":""}>Done</option>
                    </select>
                    </label>
                    </div>)
}

export default Status