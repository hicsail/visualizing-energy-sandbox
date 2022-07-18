import {
  useColorModeValue,
  useDisclosure,
  useColorMode,
  chakra,
  SimpleGrid,
  VStack,
  CloseButton,
  Button,
  Flex,
  HStack,
  Spacer,
  IconButton,
  Box,
  Link,
} from "@chakra-ui/react";
import { Stack } from "immutable";
import React, { ReactElement } from "react";
import { NullLiteral } from "typescript";
import { Topic } from "../types/types";
// import { Link } from "react-router-dom";

export const Section = ({
  icon,
  title,
  href,
  topicList,
}: {
  icon?: ReactElement | null;
  title: string;
  href: string;
  topicList: Array<Topic> | undefined;
}) => {
  return (
    <Box
      m={-3}
      p={3}
      display="flex"
      alignItems="start"
      rounded="lg"
      // _hover={{
      //   bg: hbg,
      // }}
    >
      <chakra.svg
        flexShrink={0}
        h={6}
        w={6}
        color={"white"}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        {icon}
      </chakra.svg>
      <Box ml={4}>
        <Box fontWeight="700" color="lightgrey" pb="10px">
          <Link href={href} fontSize={"1.25rem"}>
            {" "}
            {title}
          </Link>
        </Box>
        {topicList?.map((subtopic) => (
          <Box key={subtopic.title}>
            <Link href={subtopic.href} fontSize={"1.25rem"}>
              {" "}
              {subtopic.title}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
