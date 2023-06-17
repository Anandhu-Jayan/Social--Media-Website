import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dispatch } from "react";
import { IoSend } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

interface propsInterface {
  postid: string;
  setIsComment: Dispatch<boolean>;
  allowScroll: () => void;
}
interface commentInterface {
  comment: string;
  postid: string;
  userProfileUrl: string | null;
  userid: string | null;
  userName: string | null;
}
export const Displaycomments = (props: propsInterface) => {
  const [user] = useAuthState(auth);
  const commentref = collection(db, "comments");
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState<commentInterface[] | null>(null);
  const commentdocs = query(commentref, where("postid", "==", props.postid));

  const addComment = async () => {
    try {
      await addDoc(commentref, {
        userName: user?.displayName,
        comment: commentContent,
        postid: props.postid,
        userProfileUrl: user?.photoURL,
        userid: user?.uid,
      });
      user?.displayName != null &&
        user?.uid != null &&
        user?.photoURL != null &&
        setComments((prev) =>
          prev != null
            ? [
                ...prev,
                {
                  comment: commentContent,
                  postid: props.postid,
                  userProfileUrl: user?.photoURL,
                  userid: user?.uid,
                  userName: user?.displayName,
                },
              ]
            : [
                {
                  comment: commentContent,
                  postid: props.postid,
                  userProfileUrl: user?.photoURL,
                  userid: user?.uid,
                  userName: user?.displayName,
                },
              ]
        );
      setCommentContent("");
    } catch (e) {
      console.log(e);
    }
  };
  const getComments = async () => {
    const data = await getDocs(commentdocs);
    setComments(
      data.docs.map((doc) => {
        return {
          comment: doc.data().comment,
          postid: doc.data().postid,
          userProfileUrl: doc.data().userProfileUrl,
          userid: doc.data().userid,
          userName: doc.data().userName,
        };
      })
    );
  };
  useEffect(() => {
    getComments();
  }, []);
  const exitCommentSection = () => {
    props.setIsComment(false);
    props.allowScroll();
  };
  return (
    <div className="displaycomments">
      <div className="commentBox">
        {comments?.map((doc, index) => {
          const style =
            index === comments.length - 1
              ? { marginBottom: "50px" }
              : undefined;
          return (
            <div className="commentBubbleContainer">
              {doc.userProfileUrl != null && (
                <img src={doc?.userProfileUrl} className="commentUserPic"></img>
              )}
              <div className="commentbubble" style={style}>
                <div className="commentUserName" style={{ fontWeight: "600" }}>
                  {" "}
                  {doc.userName}
                </div>
                <div className="commentContent">{doc.comment}</div>
              </div>
            </div>
          );
        })}
        <div className="wrapperCommentBox ">
          {" "}
          <div className="addCommentBox">
            {user != null && user.photoURL != null && (
              <img
                src={user?.photoURL}
                className="commentUserPic"
                style={{ marginRight: "4px" }}
              ></img>
            )}
            <textarea
              className="commentInput"
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write a comment..."
              value={commentContent}
            ></textarea>
            <button
              onClick={addComment}
              disabled={!commentContent}
              className="commentButton"
            >
              <IoSend />
            </button>
          </div>
        </div>

        <div className="wrapperExit">
          <button className="exitButton" onClick={exitCommentSection}>
            <FontAwesomeIcon icon={faCircleXmark} className="exitButton" />
          </button>
        </div>
      </div>
    </div>
  );
};
