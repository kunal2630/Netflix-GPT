import React, { useEffect, useState } from "react";
import userLogo from "../images/Netflix-avatar.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { updateSearchValue } from "../utils/searchSlice";

const Header = () => {
  const userName = useSelector((store) => store.user);
  const searchValue = useSelector((store) => store?.search?.searchValue
  );
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolling, setScrolling] = useState(false);

  //Benefit of using this(onAuthStateChanged) is that this will be called when auth changes - that is when user log in or log out , and using inside useEffect will ensure that it will run atleast once at the starting
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    return () => unsubscribe();
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="absolute ">
      <div
        className={`flex  justify-between   bg-gradient-to-b from-[#141414] transition-all ease-in-out duration-1000 text-white ${
          userName ? "fixed" : "relative"
        } w-[100%] top-0 z-30 px-2  ${
          (scrolling && userName )? "bg-[#141414] " : " "
        }  `}
      >
        <div className=" overflow-hidden   hover:cursor-pointer ">
          <img
            src={NETFLIX_LOGO}
            className="xl:w-36 lg:w-32 md:w-28 sm:w-24 w-20  overflow-hidden"
            alt="logo"
          />
        </div>

        {userName && (
          <>
            <div className=" flex items-center  gap-6 relative ">
              <div
                className="hover:cursor-pointer outline-none focus:outline-none"
                onClick={() => {
                  dispatch(updateSearchValue());
                }}
              >
                <button className={`flex text-lg outline-none focus:outline-none rounded-lg items-center gap-2 hover:text-red-600 hover:bg-black p-1 px-2 ${searchValue?"text-red-600 bg-black":""}`}>
                  {searchValue ? (
                    "HOME"
                  ) : (
                    <>
                      {" "}
                      GPT <FaSearch size={15} />{" "}
                    </>
                  )}
                </button>
              </div>

              <p className="hidden md:flex text-xl font-bold">
                {userName?.displayName}
              </p>
              <IoIosNotifications
                className="text-3xl  hover:cursor-pointer"
                size={25}
              />
              <div className="flex gap-2 ">
                <img
                  className="w-9 h-9 mt-1 object-cover rounded-md"
                  src={userLogo}
                  alt=""
                />
                <div className="dropdown-sm mt-3">
                  <button
                    className="btn outline-none focus:outline-none btn-secondary btn-sm  border-none dropdown-toggle"
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
                    <a
                      className="dropdown-item hover:bg-black hover:text-white"
                      href="/"
                    >
                      Manage Profile
                    </a>
                    <a
                      className="dropdown-item hover:bg-black hover:text-white"
                      href="/"
                    >
                      Account
                    </a>
                    <a
                      className="dropdown-item hover:bg-black hover:text-white"
                      href="/"
                    >
                      Help Centre
                    </a>

                    <div className="dropdown-divider "></div>
                    <button
                      className="dropdown-item hover:bg-red-600 hover:text-white"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
