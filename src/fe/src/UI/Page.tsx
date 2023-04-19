import * as React from "react";
import { Container, Grid, GridItem, Heading } from "@chakra-ui/react";
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
          <GridItem colSpan={3} padding="0 0.75em">
            <Link to="/">
              <Heading size="lg">Demo App</Heading>
            </Link>
          </GridItem>
          <GridItem padding="2em 0.75em">
            <p>Search box</p>
          </GridItem>
          <GridItem colSpan={3} overflow="scroll">
            {children}
          </GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </Container>
     
    </ChakraProvider>
  );
}