import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import ReactDropzone from "react-dropzone";
import { storage } from "../utils/firebase";
const [data, setData] = useState("");
// call setfile on file input onChange
const [file, setFile] = useState(null);
const UploadImage = () => {
  // set initial state for the object

  //By creating a reference to a file, your app gains access to it.
  const storageRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  {
    console.log("?");
  }
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is" + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload paused");
          break;
        case "running":
          console.log("Upload running");
          break;
        default:
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
        // you keep uploaded img url
        setData((prev) => ({ ...prev, img: downloadedURL }));
      });
    }
  );
};
export default UploadImage;
