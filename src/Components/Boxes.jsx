import React from 'react'

const Boxes = (props) => {

    return (
        <div className='box border-2 border-black rounded-lg p-3 md:w-1/3 w-full flex gap-2 items-center justify-between'>
            <div>
                <p>{props.subject}</p>
                <h1 className='text-4xl font-bold'>₹{props.amount}</h1>
            </div>
        </div>
    )
}

export default Boxes
