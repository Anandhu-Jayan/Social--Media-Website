import {auth,provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'


export const Login=()=>{
    const navigate =useNavigate();
    const googleSignIn=async()=>{
        const result =await signInWithPopup(auth,provider);
        console.log(result);
        navigate('/');
    }
    return (
    <div className="login">
      <h2>Sign In with Google</h2>
      <button id="signin" onClick={googleSignIn}>Sign In</button>
     </div>
   
    );
}