import React, { useState } from "react";
import "./LandingPage.css";

const Landingpage = () => {
  const logo =
    "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

  const [signIn, setSignIn] = useState(true);

  const toggleSignUp = () => {
    setSignIn(!signIn);
  };

  return (
    <div className="form absolute w-[100%]  min-h-[100vh] p-auto">
      <div className="relative pl-8 w-72 bg-gradient-to-b from-black  hover:cursor-pointer ">
        <img src={logo} alt="logo" />
      </div>

      <form className="bg-black rounded-xl md:w-[70%] lg:w-[50%] xl:w-[40%] w-[95%]  mx-auto p-20 bg-opacity-90 my-10">
        <h1 className="text-white text-5xl font-bold m-4 mb-8">
          {signIn ? "Sign In" : "Sign Up"}
        </h1>
        {!signIn && (
          <input
            className=" text-white w-[90%] p-4 m-3 text-2xl bg-[#333333] rounded-md outline-none"
            type="text"
            name=""
            id=""
            placeholder="Full Name"
          />
        )}
        <input
          className=" text-white w-[90%] p-4 m-3 text-2xl bg-[#333333] rounded-md outline-none"
          type="text"
          name=""
          id=""
          placeholder="Email or phone number"
        />
        <input
          className="text-white w-[90%] p-4 m-3 text-2xl bg-[#333333] rounded-md outline-none"
          type="password"
          name=""
          id=""
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-[90%] text-3xl p-3 m-3 mt-10 text-white bg-[#e50914] rounded-lg "
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
  );
};

export default Landingpage;
