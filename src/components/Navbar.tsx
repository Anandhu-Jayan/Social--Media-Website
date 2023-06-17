import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
export const Navbar = () => {
  const [user] = useAuthState(auth);
  const logOut = async () => {
    await signOut(auth);
  };
  return (
    <div className="navBar">
      <div>
        <Link className="Link navBarHome" to="/" >
          Home
        </Link>
       {!user? <Link className="Link" to="/login">
          Login
        </Link>:
        <Link className="Link" to="/createpost">Create Post</Link>}
      </div>
      <div className="rightNav">
        {user && (
          <>
            <p className="usercard" style={{ color: "white" }}>
              {user?.displayName}
            </p>
            <span className="helper"></span>
            <img
              alt="User Profile"
              className="usercard"
              id="userpfp"
              src={user?.photoURL || ""}
            ></img>

            <button onClick={logOut} className="logoutButton">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};
