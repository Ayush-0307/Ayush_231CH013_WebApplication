import React from 'react'
import Input from './Input'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase';
import { provider } from '../firebase';

const Signup = () => {

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [CnfPassword, setCnfPassword] = useState("")
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const CreateAcc = () => {
        // We have to authenticate the user and create its account

        setLoading(true)
        if (Name != "" && Email != "" && Password != "" && CnfPassword != "") {
            if (Password === CnfPassword) {
                createUserWithEmailAndPassword(auth, Email, Password)
                    .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        // console.log(user);                             //object that contain user
                        // console.log(user.uid);                         //object that contain user uid
                        alert("Account created Successfully");
                        setName("")
                        setEmail("")
                        setPassword("")
                        setCnfPassword("")
                        setLoading(false)

                        createDB(user)                                             //createDB function help us to create a document for our database             

                        navigate("/dashboard")
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage);
                        alert(errorMessage);
                        setLoading(false)
                    });
            }
            else {
                alert("Password and Confirm Password didn't match!")
                setLoading(false)
            }
        }
        else {
            alert("All Fields are Mandatory!")
            setLoading(false)
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
                // IdP data available using getAdditionalUserInfo(result)
                // console.log(user);
                // alert("user authenticated")
                createDB(user)
                navigate("/dashboard")
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                alert("Error login with google")
            });
    }

    const db = getFirestore();
    const createDB = async (user) => {                                              //createDB function help us to create a document for our database    
        await setDoc(doc(db, "users", user.uid), {                                  //setDoc: This function writes data to Firestore. If the document doesn't exist, it will create it; if it does exist, it will overwrite it.
            name: user.displayName ? user.displayName : Name,                       //user.displayName ? <from google> : <from what we give>,
            email: user.email ? user.email : Email,
            id: user.uid,
            photoUrl: user.photoURL,                                                //user.photoURL ? user.photoURL : "no url",
            createdAt: new Date()
        });
    }

    return (
        <>
            <div className='h-screen m-1 flex flex-col items-center justify-center'>
                <div className="child border-2 border-black rounded-3xl w-96 pt-3 pb-6 px-7">
                    <h2 className='text-lg flex items-center justify-center'>SignUp on&nbsp;<b>FinTrack</b></h2>
                    <form className='mb-5 mt-6'>
                        <Input type="text" fill="Full Name" value={Name.charAt(0).toUpperCase() + Name.slice(1)} setValue={setName} placeholder="Rahul Raj" />
                        <Input type="email" fill="Email Id" value={Email} setValue={setEmail} placeholder="rahulraj@gmail.com" />
                        <Input type="password" fill="Password" value={Password} setValue={setPassword} placeholder="Rahul123" />
                        <Input type="password" fill="Confirm Password" value={CnfPassword} setValue={setCnfPassword} placeholder="Rahul123" />
                    </form>
                    <Button fill={Loading ? "Loading" : "Create Account"} onClick={CreateAcc} />
                    <Button fill="SignUp with Google" onClick={createAccUsingGoogle} />
                    <p className='text-sm flex item-center justify-center mt-2'>Already have an account!&nbsp;<Link to="/signin" className='text-blue-800 underline font-semibold'>Login</Link></p>
                </div>
            </div>
        </>
    )
}

export default Signup
