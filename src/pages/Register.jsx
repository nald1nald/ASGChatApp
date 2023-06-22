import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr ] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create a new user account using Firebase authentication
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a reference to the storage location for the user's avatar
      const storageRef = ref(storage, displayName);

      // Upload the avatar image to the storage location
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for the progress and completion of the upload task
      uploadTask.on(
        (error) => {
          // If an error occurs during the upload, set the error state
          setErr(true);
        },
        () => {
          // Once the upload is complete, retrieve the download URL of the uploaded image
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // Update the user's profile with the provided display name
            await updateProfile(res.user, {
              displayName,
            });

            // Store user information in the Firestore database
            await setDoc(doc(collection(db, "users"), res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
            });

            // Create a user chats document for the user
            await setDoc(doc(collection(db, "userChats"), res.user.uid), {});

            // Navigate to the home page
            navigate("/");
          });
        }
      );
    } catch (err) {
      // If an error occurs during the signup process, set the error state
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">chatapp</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an Avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
