import React, {  useState } from "react";
import { Link } from "react-router-dom";
import Page from "./UI/Page";

function Debugger() {

  // const [userData, setUserData] = useState(null);
  const [questionNumber, setQuestion] = useState<number>(0);


  function getData() {
   
  }

  function addAnswers() {
    fetch("http://localhost:8000/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        test: "test",
      },
      body: JSON.stringify({ data: [{ code: 1, answer: 3 }] }),
    })
      .then((res) => {
        console.log(res, typeof res);
        if (res.status >= 400) {
          console.log("bad request", res.statusText);
        } else if (res.status === 200) {
          return res.json();
        }
      })
      .then((r) => console.log("res", r))
      .catch(console.error);
  }

  function getQuestion() {

    fetch(`http://localhost:8000/question/${questionNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        test: "test",
      },
    })
      .then((res) => {
        console.log(res, typeof res);
        if (res.status > 400) {
          console.log(res.statusText);
        } else if (res.status === 200) {
          return res.json();
        }
      })
      .then((r) => console.log("res", r))
      .catch(console.error);
  }

  function setQuestionNumber(evt: React.ChangeEvent<HTMLInputElement>) {
    if (Number.isFinite(Number(evt.target.value))) {
      setQuestion(Number(evt.target.value));
    } else {
      setQuestion(0);
    }
  }
  return (
    <Page>
   
        <section>
        <div>
          <button type="button" onClick={getData}>
            Get Score
          </button>
          <button type="button" onClick={addAnswers}>
            Add Anwsers
          </button>
          <Link to="/questions"> Questions </Link>
        </div>
        <div>
          {questionNumber > -1 && (
            <div>
              <input
                type="number"
                onChange={setQuestionNumber}
                value={questionNumber}
              />
              <button type="button" onClick={getQuestion}>
                Get question
              </button>
            </div>
          )}
        </div>
     
      </section> 
 
    </Page>
  )
}

export default Debugger;