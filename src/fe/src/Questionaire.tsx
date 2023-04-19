import React, { useState } from "react";
import { Link } from "react-router-dom";
import Page from "./UI/Page";
import { useQueryResults } from "./hooks/useQueryResults";
import { Box, Button } from "@chakra-ui/react";
import { Question } from "./types";
import QuestionCmp from "./UI/QuestionCmp";
import { useAppContext } from "./AppContext";

const BASE = 1;
const MAX_Q = 5;


function Questionaire() {
  const [question, setQuestion] = useState<number>(1);
  const { responses, setResponses} = useAppContext();

  function setQuestionNumber(step: number) {
    return () => {
         if ((question < MAX_Q && step > 0) || (question > BASE && step < 0)) {
        setQuestion(question + step);
      } else {
        setQuestion(BASE);
      }
    };
  }
  const { isValidating, error, result } = useQueryResults(
    `http://localhost:8000/question/${question}`
  );

  const questionDef: Question = result;

  const onAnswserChange =  (index: number) => () => {
      setResponses(() => {
        const _result = new Map();
        responses.forEach((val, key)=> {
          _result.set(key,val);
        })
        _result.set(question, index);  
        return _result;
      });
  };

  let pageContent = <React.Fragment></React.Fragment>;
  if (isValidating) {
    pageContent = (
      <Box bg="teal" color="white">
        Loading ...
      </Box>
    );
  }

  if (error) {
    pageContent = (
      <Box bg="red" color="white">
        Some error occured!
      </Box>
    );
  }

  if (result === null) {
    pageContent = (
      <Box bg="red" color="white">
        No data
      </Box>
    );
  } else if (result) {
    pageContent = (
      <div>
        <Box bg="tomato" w="100%" p={4} color="white">
          Question
          <i>
            {question}/{MAX_Q}
          </i>
  
        </Box>
        <QuestionCmp
          questionData={questionDef}
          onAnswer={onAnswserChange}
         
        />

        <Box className="question-nav" marginTop="5">
          <Button
            bg="blue.400"
            type="button"
            onClick={setQuestionNumber(-1)}
            isDisabled={question === BASE}
          >
            Back
          </Button>
          <Button
            bg="blue.400"
            type="button"
            onClick={setQuestionNumber(1)}
            isDisabled={question === MAX_Q}
          >
            Next
          </Button>
        </Box>

        <div>
          <Link to="/results">Results</Link>
        </div>
      </div>
    );
  }

  return <Page>{pageContent}</Page>;
}

export default Questionaire;
