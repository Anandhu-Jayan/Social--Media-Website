import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import {useNavigate} from 'react-router-dom'
export const ConfirmPage=()=>{
    const navigate=useNavigate();
    return (<div><FontAwesomeIcon icon={faCircleCheck} className='confirmIcon'/><h1>Posted Successfully</h1>
    <button className='goHomeButton' onClick={()=>navigate("/")}>Go Back to Home</button>
    </div>
    
    )
}