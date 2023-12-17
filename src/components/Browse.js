import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

const Browse = () => {
  const user = useSelector((store) => store.user);

  return (
    <div>
      
        <Header />
    </div>
  );
};

export default Browse;
