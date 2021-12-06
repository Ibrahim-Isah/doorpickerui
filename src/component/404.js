import React from "react";
import { Link } from "react-router-dom";
import Fullpage from "../layout/Fullpage";

const Notfound = () => {
  return (
    <Fullpage>
      <h1>Not Found</h1>
      <Link to="/">Back to Home</Link>
    </Fullpage>
  );
};

export default Notfound;
