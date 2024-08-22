import React from 'react'

const Button = (props) => {
  return (
    <div>
      <button className='w-full mt-3 cursor-pointer py-1 px-3 rounded-3xl bg-blue-400 hover:bg-blue-600 hover:text-white font-semibold' onClick={props.onClick}>{props.fill}</button>
    </div>
  )
}

export default Button
