import React, { useState, useRef } from "react";

import {
  ValidateFormEmail,
  ValidateFormPassword,
} from "../utils/ValidateFormCode";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { updateProfile } from "firebase/auth";
import Header from "./Header.js";

const Landingpage = () => {
  const dispatch = useDispatch();

  const [signIn, setSignIn] = useState(true);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);
  const [authError, setAuthError] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignUp = () => {
    setEmailErrorMsg(null);
    setPasswordErrorMsg(null);
    setAuthError(null);
    setSignIn(!signIn);
  };

  const formValidate = () => {
    const emailError = ValidateFormEmail(email.current.value);
    setEmailErrorMsg(emailError);
    const passwordError = ValidateFormPassword(password.current.value);
    setPasswordErrorMsg(passwordError);

    //Sign In , Sign Up Auth Code
    if (emailErrorMsg === null && passwordErrorMsg === null) {
      if (signIn) {
        //sign in
        setAuthError(null);
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setAuthError(errorCode + errorMessage);
          });
      } else {
        //sign up
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
            })
              .then(() => {
                // Profile updated!
                const { uid, email, displayName } = auth.currentUser;
                dispatch(
                  addUser({ uid: uid, email: email, displayName: displayName })
                );
              })
              .catch((error) => {
                // An error occurred
                setAuthError(error.message);
              });
            alert("Thanks For Signing Up");
            setSignIn(true);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setAuthError(errorCode + errorMessage);
          });
      }
    }
  };

  return (
    <div className="relative">
      <Header />

      <div className="form absolute  min-h-[120vh]  bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_medium.jpg')]  w-full  bg-cover">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="bg-black rounded-2xl p-4 md:w-1/2  lg:w-1/3 w-3/4
           bg-opacity-90 mt-24 mx-auto"
        >
          <h1 className="text-white text-4xl font-bold m-4 mb-8">
            {signIn ? "Sign In" : "Sign Up"}
          </h1>
          {!signIn && (
            <input
              className=" text-white w-[90%] p-[13px]  m-3 text-lg bg-[#333333] rounded-md outline-none"
              ref={name}
              type="text"
              name=""
              id=""
              placeholder="Full Name"
            />
          )}
          <input
            className=" text-white w-[90%] p-[13px] m-3 text-lg bg-[#333333] rounded-md outline-none"
            ref={email}
            type="text"
            name=""
            placeholder="Email or phone number"
          />
          {!signIn && emailErrorMsg && (
            <p className="text-red-600 p-3 text-xl">{emailErrorMsg}</p>
          )}
          <input
            className="text-white w-[90%] p-[13px] m-3 text-lg bg-[#333333] rounded-md outline-none"
            ref={password}
            type="password"
            name=""
            placeholder="Password"
          />
          {!signIn && passwordErrorMsg && (
            <p className="text-red-600 p-3 text-3xl">{passwordErrorMsg}</p>
          )}
          {signIn && authError && (
            <p className="text-red-600 p-3 text-xl">
              Invalid Username or Password
            </p>
          )}
          <button
            onClick={formValidate}
            type="submit"
            className="w-[90%] text-xl p-2 m-3 mt-10 text-white bg-[#e50914] rounded-lg "
          >
            {signIn ? "Sign In" : "Sign Up"}
          </button>

          <p className=" m-3  text-xl text-gray-400">
            {signIn ? "New to Netflix?" : "Already Registered!"}{" "}
            <span
              onClick={toggleSignUp}
              className=" hover:underline hover:cursor-pointer text-2xl text-white"
            >
              {signIn ? "Sign Up Now!" : "Sign In"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Landingpage;
