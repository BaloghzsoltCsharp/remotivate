import React from 'react'

const Date = (props) => {
return (
    <div>
        <div className='date'>Created on: {props.date.createdDate}</div>
        <div className='date'>DeadLine: {props.date.deadLine}</div>

        {props.date.latestModification!==null && (
            <div className='date'>Last modified: {props.date.latestModification}</div>
            )}
        {props.date.completedOn!==null && (
            <div className='date'>
                Completed On: {props.date.completedOn}
            </div>
        )}
    </div>
)
}

export default Date