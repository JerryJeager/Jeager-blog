import { auth, app } from "../firebase"
import { signInWithRedirect, getAuth, GoogleAuthProvider, getRedirectResult } from "firebase/auth"
import { useEffect } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";


const Login = () => {

    const handleSignIn = () => {
    const provider = new GoogleAuthProvider()

    signInWithRedirect(auth, provider)
    }

useEffect(() => {
    const auth = getAuth(app);
    getRedirectResult(auth)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }, []);

    return (
        <div className="h-[80vh] p-6 flex justify-center items-center">
            <GoogleLoginButton onClick={handleSignIn}/>
        </div>
    )
}

export default Login