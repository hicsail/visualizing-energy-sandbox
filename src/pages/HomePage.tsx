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
                        <Heading pb="12px">Energy in-depth</Heading>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.{" "}
                        </Text>
                    </Box>
                    <Box m="20px" border="1px solid black">
                        <Image src="https://picsum.photos/800/800" />
                    </Box>
                </Flex>
                <Flex
                    bgColor="#D3D3D3"
                    width="100%"
                    justifyContent="center"
                    p="12px"
                >
                    <Text>Our Topics</Text>
                </Flex>
                <Flex
                    bgColor="#D3D3D3"
                    width="100%"
                    p="0 24px 24px 24px"
                    justifyContent="center"
                >
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
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
                        </Text>
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
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
                        </Text>
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
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
                        </Text>
                    </Flex>
                </Flex>
                <Flex width="100%" justifyContent="space-between" p="20px">
                    <Text>Latest Released</Text>
                    <Text as="u">See All</Text>
                </Flex>
                <Flex
                    p="20px"
                    justifyContent="space-between"
                    gap="20px"
                    width="100%"
                >
                    <Box bg="#D3D3D3" width="100%">
                        <Image
                            src="https://picsum.photos/300/300"
                            objectFit="cover"
                        />
                        <Text>Captions/ Title</Text>
                    </Box>
                    <Box bg="#D3D3D3" width="100%">
                        <Image src="https://picsum.photos/300/300" />
                        <Text>Captions/ Title</Text>
                    </Box>
                    <Box bg="#D3D3D3" width="100%">
                        <Image src="https://picsum.photos/300/300" />
                        <Text>Captions/ Title</Text>
                    </Box>
                    <Box bg="#D3D3D3" width="100%">
                        <Image src="https://picsum.photos/300/300" />
                        <Text>Captions/ Title</Text>
                    </Box>
                </Flex>
            </Flex>
        </Layout>
    );
};
