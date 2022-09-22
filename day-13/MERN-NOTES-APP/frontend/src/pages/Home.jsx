import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  
  
  return (
    <div>
      <h1>NOTES APP : MERN</h1>
      <Link to="/notes" >GET NOTES</Link>
    </div>
  );
};

export default Home;
