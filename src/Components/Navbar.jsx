import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const Navbar = () => {

  const [user, loading] = useAuthState(auth);                          //if user is loged-in then user value is true
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, loading])

  const logout = () => {
    // console.log(user);
    signOut(auth).then(() => {
      navigate("/signin")
    }).catch((error) => {
      alert("An error happened.")
    });
  }

  return (
    <div className='flex justify-between items-center sticky top-0 z-10 left-0 pr-2 pl-4 py-3 bg-green-400'>
      <h2 className='font-bold text-3xl cursor-pointer'>FinTrack</h2>
      {(user) ? <span className='cursor-pointer hover:font-semibold border-2 border-transparent p-1 rounded-lg inline' onClick={logout}>Logout</span> : <p></p>}
    </div>
  )
}

export default Navbar
