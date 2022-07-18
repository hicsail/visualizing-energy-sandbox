import { Box, Flex, Heading } from "@chakra-ui/react";
import * as React from "react";

interface Props {
  title: string | null;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ title, style, children }) => {
  return (
    <Flex
      display="column"
      width="100%"
      justifyContent="flex-start"
      alignItems="flex-start"
      maxWidth="80%"
      margin="0 auto"
    >
      {title == null ? (
        <></>
      ) : (
        <Flex marginBottom="30px" width="100%" style={style}>
          <Heading marginBottom="15px">{title}</Heading>
        </Flex>
      )}
      <Box width="100%">{children}</Box>
    </Flex>
  );
};
