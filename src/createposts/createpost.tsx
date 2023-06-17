import {CreateForm} from './createform'
import {useNavigate} from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useEffect } from 'react';
export const Createpost=()=>{
    const [user] = useAuthState(auth);
    const navigate=useNavigate();
    useEffect(()=>{
        (!user) && navigate("/"); 

    },[user])
    return (<div className="createpost">
       
        <CreateForm/>
        
        </div>);
}