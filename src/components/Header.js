import React, { useEffect } from "react";
import userLogo from "../images/Netflix-avatar.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {

  const userName = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


      //Benefit of using this(onAuthStateChanged) is that this will be called when auth changes - that is when user log in or log out , and using inside useEffect will ensure that it will run atleast once at the starting
  useEffect(() => {
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    
    //Unsubscribe when the component unmounts
    return ()=>unsubscribe();

  },[]);


  const signoutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="absolute">
      <div
        className={`flex  justify-between p-1  bg-${
          userName ? "black" :""
        }  text-white ${userName ?'fixed':'relative'} w-[100%] top-0 z-20 px-4 bg-gradient-to-b from-black`}
      >
        <div className="relative   hover:cursor-pointer ">
          <img src={NETFLIX_LOGO} className="w-40  "  alt="logo" />
        </div>

        {userName && (
          <div className=" flex items-center gap-8 ">
            <div>
              <span class="material-symbols-outlined text-3xl pt-2 hover:cursor-pointer">search</span>
            </div>
            <p className="text-2xl font-bold">{userName?.displayName}</p>
            <span className="material-symbols-outlined text-3xl pt-2 hover:cursor-pointer">
              notifications
            </span>
            <div className="flex gap-2 ">
              <img className="w-9 mt-2 object-cover rounded-md" src={userLogo} alt="" />
              <div className="dropdown-sm mt-3">
                <button
                  className="btn btn-secondary btn-sm  border-none dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item hover:bg-black hover:text-white" href="/">
                    Manage Profile
                  </a>
                  <a className="dropdown-item hover:bg-black hover:text-white" href="/">
                    Account
                  </a>
                  <a className="dropdown-item hover:bg-black hover:text-white" href="/">
                    Help Centre
                  </a>

                  <div className="dropdown-divider "></div>
                  <button className="dropdown-item hover:bg-red-600 hover:text-white" onClick={signoutHandler}>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
