import React from "react";
import { Link } from "react-router-dom";
import Page from './UI/Page';

function Questions() {
 
  return (
    <Page>
    <div>
      <p>Questions</p>
      <div>
        <Link to="/results">Results</Link>
      </div>
    </div>
    </Page>
  );
}

export default Questions;
