import React from "react";
import { useSWRConfig } from 'swr';

import { Box, Button, Heading, Image } from "@chakra-ui/react";
import Page from "../UI/Page";
import {  useNavigate } from "react-router-dom";
import { USERID_KEY } from '../constatnts';

function Intro() {
  const { cache } = useSWRConfig();
  const navigate = useNavigate();
  function genNewKey() {
    if (!cache.get(USERID_KEY)) {
      const newKey =(Math.random()*10000000).toString(16);
      console.log(newKey)
      cache.set(USERID_KEY, newKey)
    }
    navigate('/questions')
  }

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
          <Button type="button" onClick={genNewKey} >Start the test</Button>
      </React.Fragment>
    </Page>
  );
}

export default Intro;
