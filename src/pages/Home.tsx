import React, { useEffect, useState, useContext, useRef } from "react";
import { Layout } from "../components/Layout";
import { UserContext } from "../UserContext";
import { Box, Flex, Heading, Text, Image, Icon } from "@chakra-ui/react";
import "../components/resizable.css";
import { IoMdNuclear, IoMdPeople } from "react-icons/io";
import { BsRecycle } from "react-icons/bs";
export const Home = () => {
  const { isAdmin, setisAdmin } = useContext(UserContext);

  return (
    <Layout title={null}>
      <Flex direction="column" alignItems="center">
        <Flex>
          <Box width="50%" m="20px">
            <Heading>Energy in-depth</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.{" "}
            </Text>
          </Box>
          <Box m="20px">
            <Image src="https://picsum.photos/800/800" />
          </Box>
        </Flex>
        <Flex bgColor="#D3D3D3" width="100%" justifyContent="center" p="20px">
          <Heading>Our Topics</Heading>
        </Flex>
        <Flex bgColor="#D3D3D3" width="100%" p="20px">
          <Flex
            border="solid black 2px"
            direction="column"
            alignItems="center"
            margin="20px"
            p="20px"
            justifyContent="center"
          >
            <Icon as={IoMdNuclear} w={30} h={30}>
              {/* <IoMdNuclear /> */}
            </Icon>
            <Heading>Nuclear Energy</Heading>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
          </Flex>
          <Flex
            border="solid black 2px"
            direction="column"
            alignItems="center"
            margin="20px"
            p="20px"
            justifyContent="center"
          >
            <Icon as={IoMdPeople} w={30} h={30}>
              {/* <IoMdPeople /> */}
            </Icon>
            <Heading>Society</Heading>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
          </Flex>
          <Flex
            border="solid black 2px"
            direction="column"
            alignItems="center"
            margin="20px"
            p="20px"
            justifyContent="center"
          >
            <Icon as={BsRecycle} w={30} h={30} />
            <Heading>Renewable Energy</Heading>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
          </Flex>
        </Flex>
        <Flex width="100%" justifyContent="space-between" p="20px">
          <Box>Latest Released</Box>
          <Box>See All</Box>
        </Flex>
        <Flex gap="20px" p="20px">
          <Box bg="#D3D3D3">
            <Image src="https://picsum.photos/300/300" />
            <Text>Captions/ Title</Text>
          </Box>
          <Box bg="#D3D3D3">
            <Image src="https://picsum.photos/300/300" />
            <Text>Captions/ Title</Text>
          </Box>
          <Box bg="#D3D3D3">
            <Image src="https://picsum.photos/300/300" />
            <Text>Captions/ Title</Text>
          </Box>
          <Box bg="#D3D3D3">
            <Image src="https://picsum.photos/300/300" />
            <Text>Captions/ Title</Text>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
};
