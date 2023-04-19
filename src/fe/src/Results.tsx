import React from "react";
import Page from "./UI/Page";
import { useQueryResults } from "./hooks/useQueryResults";
import { Box, Button, Card, CardBody, CardFooter, Heading } from "@chakra-ui/react";
import './results.css';

function Results() {
  const { result, isValidating, error } = useQueryResults(
    "http://localhost:8000/score",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        test: "test",
      },
    }
  );

  let pageContent;

  if (error) {
    pageContent = (
      <Box bg="red" color="white">
        Some error occured!
      </Box>
    );
  }

  if (isValidating) {
    pageContent = (
      <Box bg="teal" color="white">
        Loading ...
      </Box>
    );
  }

  return (
    <Page>
      <Card>
        <CardBody>
        <Heading as='h4' size='md'>
           Results
        </Heading>
        </CardBody>
        {result && Object.entries(result).map((values, idx) => {
          const total = values[1] as string;
          const precent =  Math.round((Number(total)/5)*100)
          return (
            <div className="score-line" key={idx}>
              <div className="label">
                {values[0]}:  { total}
              </div>
              <div className="progress">
                <div className="fill" style={{width:  `${precent}%`}}></div>
              
              </div>
            </div>
          )
        })}
        <CardFooter>
          <Button  bg="blue.400" > Retake the test </Button>
        </CardFooter>
      </Card>
    </Page>
  );
}

export default Results;
