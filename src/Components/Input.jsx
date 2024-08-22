import React from 'react'

const Input = (props) => {
    return (
        <div className='mt-4'>
            <p>{props.fill}</p>
            <input type={props.type} value={props.value} onChange={(e)=>{props.setValue(e.target.value)}} className='border-b-2 border-gray-400 outline-none w-full py-1 placeholder-gray-300' placeholder={props.placeholder}/>
        </div>
    )
}

export default Input
