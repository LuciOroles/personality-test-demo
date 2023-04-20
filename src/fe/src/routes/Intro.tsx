import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Image } from "@chakra-ui/react";

import Page from "../UI/Page";
import { useAppContext } from "../AppContext";
import { apiUrl, USERID_KEY } from "../constatnts";

function Intro() {
  const { getValueForKey, setCacheKey, deleteKey, setResponses } = useAppContext();
    
  const navigate = useNavigate();
  function genNewKey() {
    if (!getValueForKey(USERID_KEY)) {
      const newKey =(Math.random()*10000000).toString(16);
      setCacheKey(newKey, USERID_KEY);
    }
    navigate('/questions');
  }

  function newSurvey() {
    deleteKey(USERID_KEY);
    deleteKey(`${apiUrl}/score`);
    setResponses(new Map());
    genNewKey();
    navigate('/questions');
  }

  const hasScore = getValueForKey(`${apiUrl}/score`);
  const label = hasScore ? "Start new test" : "Start the test";

  return (
    <Page>
      <React.Fragment>
        <Heading as="h2" size="md">
          Are you an introvert or an extrovert?
        </Heading>
        <Box padding="0.5em">
          <Image
            borderRadius="md"
            objectFit="cover"
            src="https://www.psychologies.co.uk/wp-content/uploads/sites/3/2018/05/introvert_or_extrovert-1-scaled.jpg"
          ></Image>
        </Box>
          <Button type="button" onClick={hasScore? newSurvey : genNewKey} >{label}</Button>
      </React.Fragment>
    </Page>
  );
}

export default Intro;
