import React, { useState, useRef } from "react";

import "./LandingPage.css";
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
import Header from "./Header";

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
    <>
      <Header />
      <div className="form absolute w-[100%]  min-h-[100vh] p-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="bg-black rounded-2xl md:w-[55%] lg:w-[40%] xl:w-[35%] w-[95%]  mx-auto p-10 bg-opacity-90 my-24"
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
    </>
  );
};

export default Landingpage;
