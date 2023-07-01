import { auth, app } from "../firebase"
import { signInWithRedirect, getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../redux/userSlice";


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

     const handleSignIn = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(password)

        signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log('user logged in:', cred.user)
            setIsLoading(false)
            dispatch(setIsLoggedIn(true))
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
            <p className="mt-2 text-center" >Login</p>
            <form action="" onSubmit={(e) => handleSignIn(e)}>
                <input className="w-[100%] outline-none p-2 mt-2 bg-inherit text-white border-b-[.05rem] mb-4" placeholder="email" value={email} onChange={ e=> setEmail(e.target.value)} type="text" />
                <input className="w-[100%] outline-none p-2 mt-2 bg-inherit text-white border-b-[.05rem] mb-4" placeholder="password" value={password} onChange={ e=> setPassword(e.target.value)} type="password" />
                <p className="text-red mt-2">{error}</p>
                <button onClick={() => {setIsLoading(true)}} className="bg-white flex items-center justify-center w-[100%] mt-4 py-2 text-berkeleyBlue" type="submit">{`${isLoading ? "Loading..." : "Login"}`}</button>
            </form>
            <p className="text-white text-center mt-2 pb-2">Don't have an account? <Link to='/SignUp' className="font-bold underline">Sign up</Link></p>
        </div>
        </div>
    )
}

export default Login