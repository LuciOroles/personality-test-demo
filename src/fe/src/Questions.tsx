import React from "react";
import { Link } from "react-router-dom";

function Questions() {
 
  return (
    <div>
      <p>Questions</p>
      <div>
        <Link to="/results">Results</Link>
      </div>
    </div>
  );
}

export default Questions;
