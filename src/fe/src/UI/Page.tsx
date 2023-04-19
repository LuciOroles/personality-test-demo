import * as React from "react";
import { Box, Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export interface IPageProps {
  children: JSX.Element;
}

export default function Page({ children }: IPageProps) {
  return (
    <ChakraProvider>
      <Container maxW="container.lg" w="100vw" minWidth="900px">
        <Grid
          templateRows="100px 1fr"
          templateColumns="repeat(4, 1fr)"
          gap={4}
          h="100vh"
          maxHeight="100vh"
        >
          <GridItem
            colSpan={3}
            padding="0.2em 0.75em"
 
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid #444"
            }}
          >
            <Box>
              <Link to="/">
                <Heading size="md">Personality Test</Heading>
              </Link>
            </Box>
          </GridItem>
          <GridItem padding="2em 0.75em">
         
          </GridItem>
          <GridItem colSpan={3}>{children}</GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </Container>
    </ChakraProvider>
  );
}
