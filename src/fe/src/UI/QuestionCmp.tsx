import React from "react";
import { Question } from "../types";
import {  Box } from "@chakra-ui/react";
import "./QuestionComp.css";
import { useAppContext } from "../AppContext";

export interface IQuestionProps {
  questionData: Question;
  onAnswer:  (index: number) => () => void;
  
}
function QuestionCmp(props: IQuestionProps) {
  const { questionData, onAnswer } = props;
  const { responses } = useAppContext();  

  return (
    <div>
      <Box> {questionData.label} </Box>
      {questionData.answers.map((anwser) => {
        const codeS =anwser.code.toString()
        return (
          <Box 
            key={codeS} 
            className={anwser.code === responses.get(questionData.code) ? "answer selected": "answer" } 
            onClick={onAnswer(anwser.code)}
          >
            <input
              type="radio"
              id={codeS}
              value={codeS}
              name="answer"
            ></input>
            <label htmlFor={codeS}>{anwser.label}</label>
          </Box>
        );
      })}
    </div>
  );
}

export default QuestionCmp;
