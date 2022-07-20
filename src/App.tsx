import React from "react";
import { Content } from "./navigation/Content";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter";
import theme from "./theme";

function App(props: any) {
    return (
        <ChakraProvider theme={theme}>
            <Content />
        </ChakraProvider>
    );
}

export default App;
