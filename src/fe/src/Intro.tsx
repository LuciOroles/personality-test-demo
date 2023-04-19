import React from "react";
import { Box, Button, Heading, Image } from "@chakra-ui/react";
import Page from "./UI/Page";
import { Link } from "react-router-dom";

function Intro() {
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
        <Link to="/questions">
          <Button type="button">Start the test</Button>
        </Link>
      </React.Fragment>
    </Page>
  );
}

export default Intro;
