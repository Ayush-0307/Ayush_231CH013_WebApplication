import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Input from '../Components/Input'
import Button from '../Components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../firebase'

const SignIn = () => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const loginAcc = () => {
        // user is getting logged-in

        setLoading(true);
        if (Email != "" && Password != "") {
            signInWithEmailAndPassword(auth, Email, Password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    setLoading(false);
                    alert("Logged In")
                    setEmail("");
                    setPassword("");
                    navigate("/dashboard")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setLoading(false);
                    alert(errorMessage)
                });
        }
        else {
            alert("All Fields are Mandatory!");
            setLoading(false);
        }

    }

    const createAccUsingGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // createDB(user)
                navigate("/dashboard")
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                alert("Error login with google")
            });
    }

    return (
        <>
            <Navbar />
            <div className='h-screen m-1 flex flex-col items-center justify-center'>
                <div className="child border-2 border-black rounded-3xl w-96 pt-3 pb-6 px-7">
                    <h2 className='text-lg flex items-center justify-center'>SignIn on&nbsp;<b>FinTrack</b></h2>
                    <form className='my-5'>
                        <Input type="email" fill="Email Id" value={Email} setValue={setEmail} placeholder="rahulraj@gmail.com" />
                        <Input type="password" fill="Password" value={Password} setValue={setPassword} placeholder="Rahul123" />
                    </form>
                    <Button fill={Loading ? "loading" : "Login"} onClick={loginAcc} />
                    <Button fill="SignIn with Google" onClick={createAccUsingGoogle} />
                    <p className='text-sm flex item-center justify-center mt-2'>Didn't have an account!&nbsp;<Link to="/" className='text-blue-800 underline font-semibold'>Create Account</Link></p>
                </div>
            </div>
        </>
    )
}

export default SignIn
