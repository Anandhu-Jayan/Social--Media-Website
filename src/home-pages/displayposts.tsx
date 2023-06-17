import { useAuthState } from "react-firebase-hooks/auth";
import { postlistinterface } from "./home";
import { auth, db } from "../config/firebase";
import {Displaycomments} from './displaycomment'
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as liked} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as notLiked,faComment } from '@fortawesome/free-regular-svg-icons'
import {useScrollBlock} from "../hooks/useScrollBlock"
interface displaypostsinterface {
  post: postlistinterface;
}
interface LikesInterface {
  userid: string;
  likeid:string;
}
export const DisplayPosts = (props: displaypostsinterface) => {
  const [user] = useAuthState(auth);
  const likesref = collection(db, "likes");
  const [likes, setlikes] = useState<LikesInterface[] | null>(null);
  const likedocs = query(likesref, where("postid", "==", props.post.id));
  const [isComment,setIsComment]=useState<boolean>(false);
  const [blockScroll, allowScroll]=useScrollBlock();
  const addLike =async () => { 
    try {
      const newDoc=await addDoc(likesref, {
        userid: user?.uid,
        postid: props.post.id,
      });
      if (user != null) {
        setlikes((prev) =>
          prev != null
            ? [ ...prev, {userid: user?.uid ,likeid:newDoc.id}]
            : [{ userid: user?.uid,likeid:newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeLike = async () => {
    try {
      const deleteLikeQuery = query(
        likesref,
        where("postid", "==", props.post.id),
        where("userid", "==", user?.uid)
      );
      const getDeleteDoc = await getDocs(deleteLikeQuery);
      const deleteDocId = doc(db, "likes", getDeleteDoc.docs[0].id);
      await deleteDoc(deleteDocId);
      if(user!=null){
        setlikes((prev)=>prev && prev?.filter((like)=>like.likeid!=getDeleteDoc.docs[0].id))
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getLikes = async () => {
    const data = await getDocs(likedocs);
    setlikes(
      data.docs.map((doc) => {
        return { userid: doc.data().userid ,likeid:doc.id};
      })
    );
  };
  const hasCurrentUserLiked = likes?.find((like) => like.userid === user?.uid);

  useEffect(() => {
    getLikes();
    
   
  }, []);
  const commentClick=()=>{
    setIsComment(!isComment);
    blockScroll()
  }
  return (
    <div className="postCard">
      <div className="usernameandpic">
      <img src={props.post.userProfileUrl} style={{display:"inline",marginLeft:"6px"}} className="userPhoto"></img>
      <div className="userName" style={{display:"inline",marginLeft:"6px"}} >{props.post.username}</div>
      </div>
      <h1>{props.post.title}</h1>
      <p>{props.post.description}</p>
      {props.post.imgUrl!=null && <img src={props.post.imgUrl} className="postImage"></img>}
      <button className="likeButton" onClick={hasCurrentUserLiked ? removeLike : addLike}>
        {hasCurrentUserLiked ? <FontAwesomeIcon icon={liked} style={{color: "#4f46e5",}} />: <FontAwesomeIcon icon={notLiked} style={{color: "#4f46e5",}} />}
      </button>
      {likes != null && <p style={{display:"inline",marginLeft:"6px"}}>Likes:{likes.length}</p>}
      <button className="viewCommentButton" onClick={commentClick}> <FontAwesomeIcon icon={faComment} style={{color: "#4f46e5",}}  /></button>
      {(isComment) && <Displaycomments postid={props.post.id} setIsComment={setIsComment} allowScroll={allowScroll}/>}
     
    
    </div>
  );
};
