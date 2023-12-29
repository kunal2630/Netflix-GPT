import React from "react";
import { IMG_URL } from "../utils/constants";

const Moviecard = ({ posterId }) => {
  return (
    <div className="ml-2 hover:cursor-pointer relative w-[100%] shadow-inner ">
      <img
        className="max-w-none w-[180px] rounded-md hover:scale-110 ease-in-out duration-300"
        src={IMG_URL + posterId}
        alt=""
      />
    </div>
  );
};

export default Moviecard;
