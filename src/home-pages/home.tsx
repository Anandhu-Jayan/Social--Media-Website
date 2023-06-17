import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useEffect ,useState} from "react";
import {DisplayPosts} from "./displayposts"
import { useAuthState } from "react-firebase-hooks/auth";
import {WelcomePage} from './welcomePage'
export interface postlistinterface{
    username:string;
    id:string;
    userid:string;
    title:string;
    description:string;
    userProfileUrl:string;
    imgUrl:string|null;
}
export const Home = () => {
  const [user,loading] = useAuthState(auth);
  const ref = collection(db, "posts");
  const [postList,setpostList]=useState<postlistinterface[]|null>(null);
  const getPosts = async () => {
    
    const data = await getDocs(ref);
    setpostList(
      data.docs.map((doc) => {
        return {...doc.data(),id:doc.id}
      }) as postlistinterface[]
    );
  };
  useEffect(()=>{
    (user) && getPosts();
    
  },[user])
 
  return (
    <div className="home">
      {(user)?postList?.map((post)=><DisplayPosts post={post}/>):(loading)?<h1>Loading...</h1>:<WelcomePage/>}
      
    </div>
  );
};
