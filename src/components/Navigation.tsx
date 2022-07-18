import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image,
  chakra,
  SimpleGrid,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import ToggleColorButton from "./ToggleColorButton";
import { HashLink } from "react-router-hash-link";
import { Section } from "./Section";
import { NavItem, Topic } from "../types/types";
import { NAV_ITEMS, TOPICS_LIST } from "../data/topicList";

export const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      marginTop={{ base: "15px", md: "30px" }}
      marginBottom={{ base: "15px", md: "15px" }}
      paddingLeft={{ base: "30px", md: "0" }}
      paddingRight={{ base: "30px", md: "0" }}
      maxWidth={{ lg: "80%", md: "90%" }}
      width="100%"
      bgColor="#235789"
      color="white"
    >
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        paddingLeft="0"
        paddingRight="0"
        borderBottom={1}
      >
        <Flex
          justifyContent="space-between"
          align="center"
          width="100%"
          marginLeft="0px"
        >
          <Link as={ReactRouterLink} to="/">
            <Flex
              fontFamily={"heading"}
              display={{ base: "none", md: "flex" }}
              fontWeight="normal"
              lineHeight="50px"
            >
              <Box
                boxSize="45px"
                objectFit="cover"
                marginRight="10px"
                marginBottom="5px"
              >
                <Image src="https://i.pinimg.com/originals/4f/66/28/4f6628f26abee6fa283f6a7d36fbafca.jpg" />
              </Box>
              <Text
                fontSize={"1.5rem"}
                // fontFamily="Karbon"
                width="100%"
                fontWeight={500}
                marginLeft="20px"
              >
                Visualizing Energy
              </Text>
            </Flex>
          </Link>

          <Flex
            display={{ base: "none", md: "flex" }}
            ml={10}
            align="center"
            justify="flex-end"
          >
            <DesktopNav />
          </Flex>
        </Flex>

        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
          width="100%"
          alignItems="center"
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <Icon /> : <Icon />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

// const Features = (): ReactNode => {
//   return <Box>Features</Box>;
// };

// const texttheme = ["#E0533B", "#EBB54A", "#94ED6B", "#73A6FC"];
const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          {navItem.label == "Browse by Topic" ? (
            <Box role="group" bg="#235789">
              <Box>
                <Button
                  bg="#235789"
                  p={2}
                  fontSize={"1.25rem"}
                  fontWeight={500}
                  alignItems="center"
                  color="white"
                  variant="disabled"
                >
                  Browse By Topic
                </Button>
              </Box>

              <Box
                pos="absolute"
                left={0}
                w="full"
                display="none"
                _groupHover={{
                  display: "block",
                }}
                bg="#235789"
                zIndex="2"
              >
                <SimpleGrid
                  columns={{
                    base: 1,
                    md: 3,
                    lg: 5,
                  }}
                  // zIndex="-1"
                  pos="relative"
                  // pos="static"
                  gap={{
                    base: 6,
                    sm: 8,
                  }}
                  px={5}
                  py={6}
                  p={{
                    sm: 8,
                  }}
                >
                  {TOPICS_LIST.map((topic) => (
                    <Box key={topic.title}>
                      <Section
                        title={topic.title}
                        topicList={topic.children}
                        href={topic.href}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box>
                <Button
                  p={2}
                  fontSize={"1.25rem"}
                  fontWeight={500}
                  alignItems="center"
                  color="white"
                  bg="#235789"
                  variant="disabled"
                >
                  <Link
                    as={navItem.hash ? HashLink : ReactRouterLink}
                    to={navItem.href}
                    href={navItem.href ?? "#"}
                  >
                    {navItem.label}
                  </Link>
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      style={{ textDecoration: "none" }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            // _groupHover={{
            //   color: texttheme[Math.floor(Math.random() * texttheme.length)],
            // }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"1rem"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        ></Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      {/* <ToggleColorButton borderWidth={"1px"}></ToggleColorButton> */}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        // href={href ?? "#"}
        href={href}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            // as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
