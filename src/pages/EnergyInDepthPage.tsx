import {
    Box,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Flex,
} from "@chakra-ui/react";
import React from "react";
import { ArticleList } from "../components/ArticleList";
import { Layout } from "../components/Layout";
import { nuclearList, societyList, renewableList } from "../data/articleList";

export const EnergyinDepth = () => {
    return (
        <Layout title={null}>
            <Flex justifyContent="center" p="32px 0px 32px 0px">
                <Heading>Energy-In-Depth</Heading>
            </Flex>
            <Box>
                <Tabs>
                    <TabList>
                        <Tab _selected={{ borderBottom: "4px solid #FFA500" }}>
                            Nuclear Energy
                        </Tab>
                        <Tab _selected={{ borderBottom: "4px solid #FFA500" }}>
                            Society
                        </Tab>
                        <Tab _selected={{ borderBottom: "4px solid #FFA500" }}>
                            Renewable Energy
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Heading>Featured Articles 1</Heading>
                            <ArticleList
                                articleList={nuclearList}
                                color={"#C26100"}
                            />
                        </TabPanel>
                        <TabPanel>
                            <Heading>Featured Articles 2</Heading>
                            <ArticleList
                                articleList={societyList}
                                color={"#C26100"}
                            />
                        </TabPanel>
                        <TabPanel>
                            <Heading>Featured Articles 3</Heading>
                            <ArticleList
                                articleList={renewableList}
                                color={"#C26100"}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Layout>
    );
};
