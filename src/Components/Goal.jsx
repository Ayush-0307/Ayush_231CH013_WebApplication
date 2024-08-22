import React from 'react'
import { useState } from 'react';

const Goal = () => {

    const [goalName, setGoalName] = useState('');
    const [targetAmount, setTargetAmount] = useState(0);
    const [currentSavings, setCurrentSavings] = useState(0);

    const progress = Math.round((currentSavings / targetAmount) * 100);

    return (
        <div>
            <div className="savings-goal p-1 flex flex-col justify-around">
                <h2 className='font-bold text-3xl text-center underline'>Savings Goals</h2>
                <form className='flex flex-col w-full items-start mt-5 p-1 gap-1'>
                    <label>Goal Name:</label>
                    <input type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)} className='border-2 border-black w-full p-1 my-1 outline-none' />
                    <label>Target Amount:</label>
                    <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(Number(e.target.value))} className='border-2 w-full border-black p-1 my-1 outline-none' />
                    <label>Current Savings:</label>
                    <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className='border-2 w-full border-black p-1 my-1 outline-none' />

                    <div className="progress border-2 md:w-full w-1/2 border-black mt-5 rounded-full overflow-hidden">
                        <div className="filler p-1 rounded-full border-2 border-r-2 text-right font-bold border-green-400 bg-green-400" style={{ width: `${isNaN(progress) ? 0 : progress}%` }}>
                            {isNaN(progress) ? 0 : progress}%
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Goal
