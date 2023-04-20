import React, { useState } from "react";
import {   useNavigate } from "react-router-dom";
import Page from "../UI/Page";
import { useQueryResults } from "../hooks/useQueryResults";
import { Box, Button  } from "@chakra-ui/react";

import QuestionCmp from "../UI/QuestionCmp";
import { useAppContext } from "../AppContext";
import { Answer } from "../types";
import ErrorModal from "../UI/ErrorModal";
import { USERID_KEY, apiUrl } from '../constatnts';

const BASE = 1;
const MAX_Q = 5;

function Questionaire() {
  const [question, setQuestion] = useState<number>(1);
  const { getValueForKey, responses, setResponses } = useAppContext();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  function setQuestionNumber(step: number) {
    return () => {
      if ((question < MAX_Q && step > 0) || (question > BASE && step < 0)) {
        setQuestion(question + step);
      } else {
        setQuestion(BASE);
      }
    };
  }
  const {
    isValidating,
    error,
    result: questionDef,
  } = useQueryResults(`${apiUrl}/question/${question}`);

  const showResults = responses.size === MAX_Q && question === MAX_Q;

  const onAnswserChange = (index: number) => () => {
    setResponses(() => {
      const _result = new Map();
      responses.forEach((val, key) => {
        _result.set(key, val);
      });
      _result.set(question, index);
      return _result;
    });
  };

  const checkResults = async () => {
 
    const userKey = getValueForKey(USERID_KEY);

    if (typeof userKey === "string") {
      const answers: Answer[] = [];
      responses.forEach((val, key) => {
        answers.push({
          code: key,
          answer: val,
        });
      });

      try {
        const r1 = await fetch(`${apiUrl}/answers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            test: userKey,
          },
          body: JSON.stringify({
            data: answers,
          }),
        });

        if (r1.status !== 200) {
          throw Error(r1.statusText || 'API error')
        }
        await r1.json();

        navigate("/results");
      } catch (error) {
        console.error(error);
        setModalOpen(true);
      }
    }
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

  if (questionDef === null) {
    pageContent = (
      <Box bg="red" color="white">
        No data
      </Box>
    );
  } else if (questionDef) {
    pageContent = (
      <div>
        <Box bg="tomato" w="100%" p={4} color="white">
         
          <i>
            {question}/{MAX_Q}
          </i>
        </Box>
        <QuestionCmp questionData={questionDef} onAnswer={onAnswserChange} />

        <Box className="question-nav" marginTop="5">
          <Button
            bg="blue.400"
            type="button"
            onClick={setQuestionNumber(-1)}
            isDisabled={question === BASE}
          >
            Back
          </Button>
          {!showResults && (
            <Button
              bg="blue.400"
              type="button"
              onClick={setQuestionNumber(1)}
              isDisabled={question === MAX_Q}
            >
              Next
            </Button>
          )}
          <ErrorModal 
            isOpen={modalOpen} 
            onModalClose={()=> setModalOpen(false)}
            message="Error saving answers"
          />
          {showResults && (
            <Button bg="blue.400" type="button" onClick={checkResults}>
              Results
            </Button>
          )}
        </Box>
      </div>
    );
  }

  return <Page>{pageContent}</Page>;
}

export default Questionaire;
