import React from "react";
import { FaSearch } from "react-icons/fa";

const GptSearch = () => {
  return (
    <div className="form absolute  min-h-[100vh]  bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-opacity-75 w-full  bg-cover  ">
      <div className="flex  justify-center mt-28  items-center Z-30">
        <div className="flex w-[40%]  rounded-lg bg-black text-white pl-2   ">
          <div className=" w-10/12  p-3">
           
            <input
              type="text"
              name=""
              id=""
              className="w-[100%]  bg-black outline-none text-lg"
              placeholder="What you would like to watch today"
            />
          </div>

          <div className="flex w-2/12  p-2  items-center justify-center hover:cursor-pointer">
            <FaSearch size={25} className="text-white rounded-md " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptSearch;
