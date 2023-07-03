import { auth, app, db } from "../firebase"
import { signInWithRedirect, getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import {collection, addDoc} from 'firebase/firestore'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDisplayName, setUid, setIsLoggedIn } from "../redux/userSlice";


const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const createUserDoc = (uid) => {
        const colRef = collection(db, 'Users')
        addDoc(colRef, {
            'displayName': name,
            'uid': uid
        })
    }

    const updateDisplayName = () => {
        dispatch(setDisplayName(name))
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(password)

        createUserWithEmailAndPassword(auth, email, password)
        .then(cred => {
            setIsLoading(false)
            console.log('user created:', cred.user)
            createUserDoc(cred.user.uid)
            updateDisplayName()
            dispatch(setUid(cred.user.uid))
            dispatch(setIsLoading(true))
            navigate('/')

        })
        .catch(err => {
            console.log(err.message)
            let errorMessage = err.message.split('')
            errorMessage.splice(0, 9)
            setError(errorMessage.join(''))
            setIsLoading(false)
        })

    }

    return (
        <div className="h-[80vh] p-6 flex justify-center items-center">
           <div className="rounded-md p-4 w-[300px] md:w-[400px] md:px-8 bg-berkeleyBlue mx-auto text-white">
            <p className="mt-2 text-center" >Sign up</p>
            <form action="" onSubmit={e => handleSignUp(e)}>
                <input className="w-[100%] outline-none p-2 mt-2 bg-inherit text-white border-b-[.05rem] mb-4" placeholder="name" value={name} onChange={ e=> setName(e.target.value)} type="text" />
                <input className="w-[100%] outline-none p-2 mt-2 bg-inherit text-white border-b-[.05rem] mb-4" placeholder="email" value={email} onChange={ e=> setEmail(e.target.value)} type="text" />
                <input className="w-[100%] outline-none p-2 mt-2 bg-inherit text-white border-b-[.05rem] mb-4" placeholder="password(at least 6 characters)" value={password} onChange={ e=> setPassword(e.target.value)} type="password" />
                <p className="text-red mt-2">{error}</p>
            <button onClick={() => {setIsLoading(true)}} className="bg-white flex items-center justify-center w-[100%] mt-4 py-2 text-berkeleyBlue" type="submit">{`${isLoading ? "Loading..." : "Sign up"}`}</button>
            </form>
            <p className="text-white text-center mt-2 pb-2">Already have an account? <Link to='/Login' className="font-bold underline">Login</Link></p>
        </div>
        </div>
    )
}

export default SignUp