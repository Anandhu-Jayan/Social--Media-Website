import {useNavigate} from 'react-router-dom'
export const WelcomePage = () => {
  const navigate=useNavigate();
  return (
    <div className="welcomePage">
      <h1 className="welcomeHeading">Welcome,</h1>
      <h1 className="welcomeSubHeading">Sign In to View Posts</h1>
      <button className="signinButton" onClick={()=>navigate("/login")}>Sign In</button>
    </div>
  );
};
