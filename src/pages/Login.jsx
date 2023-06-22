import React, { useState } from 'react'
import Add from "../img/addAvatar.png";
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {

  const [err, setErr ] = useState(false);
  const navigate = useNavigate();

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      // Sign in the user with the provided email and password using Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the home page after successful sign-in
      navigate("/");
    } catch(err) {
      // If an error occurs during the sign-in process, set the error state
      setErr(true);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className="logo">chatapp</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          {/* Input fields for email and password */}
          <input type="email" placeholder='Email'/>
          <input type="password" placeholder='Password'/>
          {/* Button to submit the form */}
          <button>Sign In</button>
          {/* Display error message if there was an error during sign-in */}
          {err && <span>Something went wrong!</span>}
        </form>
        {/* Link to the registration page */}
        <p>Doesn't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login;
