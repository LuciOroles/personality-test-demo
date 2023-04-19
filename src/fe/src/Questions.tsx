import React, { useState } from "react";
import { Link } from "react-router-dom";
import Page from "./UI/Page";
import { useQueryResults } from "./hooks/useQueryResults";
import { Box, Button } from "@chakra-ui/react";

const BASE =1;
const MAX_Q=5;

function Questions() {
  
  const [question, setQuestion] = useState<number>(1);
  function setQuestionNumber(step: number) {

    return () => {
      if (question<MAX_Q) {
        setQuestion(question+step);
      } else {
        setQuestion(BASE);
      }
    }
  
  }
  const {isValidating, error, result } = useQueryResults(`http://localhost:8000/question/${question}`);
  console.log(isValidating, error, result);

  return (
    <Page>
      <div>
        <p>Questions</p>
        {question > -1 && (
            <Box className="question-nav">
              <Button type="button" onClick={setQuestionNumber(-1)}> Back </Button>

              <Button type="button" onClick={setQuestionNumber(1)}> Next </Button>
            </Box>
          )}
        <div>
          <Link to="/results">Results</Link>
        </div>
      </div>
    </Page>
  );
}

export default Questions;
