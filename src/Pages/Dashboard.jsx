import React from 'react'
import Navbar from '../Components/Navbar'
import Boxes from '../Components/Boxes'
import Goal from '../Components/Goal'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {

  const [Income, setIncome] = useState(0)
  const [Balance, setBalance] = useState(0)
  const [Expense, setExpense] = useState(0)

  const [slno, setSlno] = useState(1);
  const [category, setCategory] = useState("Salary");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("Income");
  const [history, setHistory] = useState([]);

  const incomeData = {
    labels: history.map(item => item.date),                                                    //X-axis
    datasets: [
      {
        label: 'Income',
        data: history.filter(item => item.type === 'Income').map(item => item.amount),         //Y-axis
        borderColor: 'blue',
        backgroundColor: 'aqua',
      },
    ],
  };
  const expenseData = {
    labels: history.map(item => item.date),
    datasets: [
      {
        label: 'Expense',
        data: history.filter(item => item.type === 'Expense').map(item => item.amount),
        borderColor: 'red',
        backgroundColor: 'pink',
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'end'
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `₹${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',                                 // X-axis label
          color: 'black',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: true,                                // Show gridlines
          color: 'green',                               // Gridline color
        },
        ticks: {
          color: 'black',                               // X-axis tick color
        },
        border: {
          color: 'black',                               // X-axis line color
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount (₹)',                           // Y-axis label
          color: 'black',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: true,                                // Show gridlines
          color: 'green',                               // Gridline color
        },
        ticks: {
          color: 'black',                               // X-axis tick color
        },
        border: {
          color: 'black',                               // X-axis line color
        }
      }
    },
  };


  useEffect(() => {
    if (type === "Income") {
      setCategory("Salary"); // Default category for Income
    } else {
      setCategory("Rent"); // Default category for Expense
    }
  }, [type]);

  const addmoney = () => {

    if (amount >= 0) {
      if (type === "Income") {
        let i = Income + Number(amount);
        setIncome(i)
        setBalance(i - Expense)
      }
      else {
        let cb = Balance - Number(amount);
        setBalance(cb);
        setExpense(Expense + Number(amount))
      }

      let newhistory = [...history];
      if (amount != 0) {
        newhistory.push({
          slno: slno,
          category: category,
          amount: (amount.toString()[0] === '0') ? Number(amount.toString().slice(1)) : amount,
          type: type,
          date: new Date().toLocaleDateString()
        })
        setHistory(newhistory)
        setSlno(slno + 1);
        setAmount(0);
        console.log(history);
      }
    }
    else {
      alert("Please enter correct amount!")
      setAmount(0)
    }

  }



  return (
    <div>

      <Navbar />

      <div className="boxes flex md:flex-row flex-col items-center justify-around mt-5 mx-6 gap-7">
        <Boxes subject="Total Income" amount={Income} setAmount={setIncome} />
        <Boxes subject="Current Balance" amount={Balance} setAmount={setBalance} />
        <Boxes subject="Total Expence" amount={Expense} setAmount={setExpense} />
      </div>


      <div className="button flex flex-col md:flex-row items-center justify-around md:justify-center mx-6 md:mx-5 md:my-2 my-5 gap-10">

        <div className="add border-2 md:w-1/5 w-full border-black mt-2">
          <h1 className='text-center font-bold underline text-2xl mt-1'>Add Your Transactions</h1>
          <div className="btn flex flex-col items-center justify-around mt-3">
            <div className="info p-2 mx-2 flex flex-col w-full">
              <label>Type:</label>
              <select type="text" value={type} onChange={(e) => { setType(e.target.value) }} className='border-2 border-black p-1 m-1 cursor-pointer'>
                <option value="Income" className='bg-black text-white cursor-pointer'>Income</option>
                <option value="Expense" className='bg-black text-white cursor-pointer'>Expense</option>
              </select>
              <label>Category:</label>
              <select type="text" value={category} onChange={(e) => { setCategory(e.target.value) }} className='border-2 border-black p-1 m-1 cursor-pointer'>
                {(type === "Expense") ?
                  <>
                    <option value="Rent" className='bg-black text-white'>Rent</option>
                    <option value="Transportation" className='bg-black text-white'>Transportation</option>
                    <option value="Groceries" className='bg-black text-white'>Groceries</option>
                    <option value="Gas" className='bg-black text-white'>Gas</option>
                    <option value="Healthcare" className='bg-black text-white'>Healthcare</option>
                    <option value="Education" className='bg-black text-white'>Education</option>
                    <option value="Others" className='bg-black text-white'>Others</option>
                  </> :
                  <>
                    <option value="Salary" className='bg-black text-white'>Salary</option>
                    <option value="Freelance work" className='bg-black text-white'>Freelance work</option>
                    <option value="Trading" className='bg-black text-white'>Trading</option>
                    <option value="Rental Income" className='bg-black text-white'>Rental Income</option>
                    <option value="Affiliate Marketing" className='bg-black text-white'>Affiliate Marketing</option>
                    <option value="Others" className='bg-black text-white'>Others</option>
                  </>}
              </select>
              <label>Amount:</label>
              <input type="number" value={amount} onChange={(e) => { setAmount(e.target.value) }} className='border-2 border-black p-1 m-1' />
              <label>Date:</label>
              <input type="date" className='border-2 border-black p-1 m-1 block' />
            </div>

            <div className="btn flex gap-10 my-1">
              <button className='bg-green-400 py-2 px-5 cursor-pointer rounded-3xl font-bold hover:text-white' onClick={addmoney}>Add</button>
              <button className='bg-green-400 py-2 px-5 cursor-pointer rounded-3xl font-bold hover:text-white' onClick={() => { setHistory([]) }}>Clear</button>
            </div>
          </div>
        </div>


        <div className="transaction border-2 border-black md:w-2/3 w-full h-96 my-5 md:my-10 overflow-scroll relative">
          <div className="label grid grid-cols-10 sticky top-0 left-0">
            <p className='font-bold flex justify-center items-center border-2 border-b-4 border-black bg-blue-500 col-span-1'>No.</p>
            <p className='font-bold flex justify-center items-center border-2 border-b-4 border-black bg-blue-500 col-span-3'>Category</p>
            <p className='font-bold flex justify-center items-center border-2 border-b-4 border-black bg-blue-500 col-span-3'>Amount</p>
            <p className='font-bold flex justify-center items-center border-2 border-b-4 border-black bg-blue-500 col-span-3'>Date</p>
          </div>
          {(history.length != 0) ? <>{history.map((item, index) => (
            <div key={index} className="label grid grid-cols-10">
              <p className='font-bold flex justify-center items-center border-x-2 border-b-4 border-black col-span-1 p-2'>{item.slno}</p>
              <p className='font-bold flex justify-center items-center border-x-2 border-b-4 border-black col-span-3 p-2'>{item.category}</p>
              <p className={`font-bold flex justify-center items-center border-x-2 border-b-4 border-black col-span-3 p-2 ${item.type === "Income" ? 'text-green-400' : 'text-red-700'}`} >{item.type === "Income" ? '+' : '-'}₹{item.amount}</p>
              <p className='font-bold flex justify-center items-center border-x-2 border-b-4 border-black col-span-3 p-2'>{item.date}</p>
            </div>
          ))}</> : <div className='border-2 border-none text-4xl h-full flex justify-center items-center text-gray-200'>Add Transactions</div>}
        </div>

        <div className="reccurring border-2 border-black h-96 w-full md:w-1/5"><Goal /></div>

      </div>

      <p className='text-center font-bold text-3xl underline'>Your Income and Expence Plot:</p>
      <div className="plots flex md:flex-row md:border-none border-2 border-black flex-col px-3 items-center justify-between py-3 m-2 gap-3 overflow-hidden h-[50vh]">
        <div className="incomeplot border-2 border-black md:w-1/2 w-full h-full flex justify-center items-center"><Line data={incomeData} options={chartOptions} /></div>
        <div className="expenceplot border-2 border-black md:w-1/2 w-full h-full flex justify-center items-center"><Line data={expenseData} options={chartOptions} /></div>
      </div>

    </div>
  )
}

export default Dashboard
