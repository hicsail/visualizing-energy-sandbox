import React from "react";
import { Content } from "./navigation/Content";
import { ChakraProvider } from "@chakra-ui/react";

function App(props: any) {
  return (
    <ChakraProvider>
      <Content />
    </ChakraProvider>
  );
}

export default App;
