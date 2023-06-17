import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import {
  getDownloadURL,
  ref as storageref,
  uploadBytesResumable,
} from "firebase/storage";
import {ConfirmPage} from './confirmationPage'
export const CreateForm = () => {
  interface datainterface {
    title: string;
    description: string;
  }
  const [file, setFile] = useState<File | null>(null);
  const [user] = useAuthState(auth);
  const [posted,setPosted]=useState(false);
  const ref = collection(db, "posts");

  const submit = async(data: datainterface) => {
    try{
    await addDoc(ref, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userid: user?.uid,
      userProfileUrl: user?.photoURL || "",
      imgUrl:await fileUpload(),
    });
   setPosted(true);}
   catch(e){
    console.log(e)
   }
  };
  const schema = yup.object().shape({
    title: yup.string().required("A title should be provided"),
    description: yup.string().required("Please add some description"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<datainterface>({ resolver: yupResolver(schema) });
  const fileUpload = async () => {
    if (file != null) {
      const uploadref = storageref(storage, `postimages/${file.name}`);
      try {
        const uploadTask = uploadBytesResumable(uploadref, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
           
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (err) => console.log(err),
           
        );
        await uploadTask;
        return await getDownloadURL(uploadTask.snapshot.ref);
        
      } catch (err) {
        console.log(err);
      }
    }
    else  return null;
  };
  return (
    (posted)?
    <ConfirmPage/>:
    <div>
       <h1>
            New Post
      </h1>
      <form onSubmit={handleSubmit(submit)}>
        <input
          id="titleinput"
          type="text"
          placeholder="Title"
          {...register("title")}
        ></input>
        <p style={{ color: "red", fontSize: "small" }}>
          {errors.title?.message}
        </p>
        <textarea
          id="descriptioninput"
          placeholder="description"
          {...register("description")}
        ></textarea>
        <p style={{ color: "red", fontSize: "small" }}>
          {errors.description?.message}
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files != null && setFile(e.target.files[0])}
        />
        <input id="postbutton" type="submit" value="Post" style={{display:"block",margin:'16px auto'}}></input>
      </form>
    
    </div>
  );
};
