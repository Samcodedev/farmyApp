import React, { useState } from "react";
import { auth, googleProvide } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import Cookies from 'universal-cookie'

const cookie = new Cookies()

const LoginPage = ({setIsAuth}) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isSignup, setIsSignup] = useState(false);

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
        const result = await signInWithPopup(auth, googleProvide)
        cookie.set('auth-token', result.user.refreshToken)
        setIsAuth(true)
    } catch (error) {
        console.error(error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error(error);
        
    }
  };

//   const logOut = async () => {
//     try {
//         await signOut(auth)
//     } catch (error) {
//         console.error(error);
//     }
//   };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-bold_main">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border rounded-lg focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-main rounded-lg hover:bg-main_hover"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center my-2">or</p>
        <button 
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={signInWithGoogle}
        >{isSignup ? "Sign Up" : "Login"} with Google</button>
        <p className="mt-4 text-sm text-center">
          {isSignup
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            className="font-bold text-main cursor-pointer hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
