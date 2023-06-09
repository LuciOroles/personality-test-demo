import React from "react";
import Page from "../UI/Page";
import { useQueryResults } from "../hooks/useQueryResults";
import { Box, Card, CardBody, Heading } from "@chakra-ui/react";
import { useSWRConfig } from "swr";
import { apiUrl, USERID_KEY } from '../constatnts';
import "./results.css";
 
function Results() {
  const { cache } = useSWRConfig();
  const { result, isValidating, error } = useQueryResults(
    `${apiUrl}/score`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        test: cache.get(USERID_KEY),
      },
    }
  );

  let pageContent = <React.Fragment></React.Fragment>;

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
  
  if (result) {
    pageContent = (
      <Card>
        <CardBody>
          <Heading as="h4" size="md">
            Results
          </Heading>
        </CardBody>
        {result &&
          Object.entries(result).map((values, idx) => {
            const total = values[1] as string;
            const precent = Math.round((Number(total) / 5) * 100);
            return (
              <div className="score-line" key={idx}>
                <div className="label">
                  {values[0]}: {total}
                </div>
                <div className="progress">
                  <div className="fill" style={{ width: `${precent}%` }}></div>
                </div>
              </div>
            );
          })}
      </Card>
    );
  }

  return <Page>{pageContent}</Page>;
}

export default Results;
