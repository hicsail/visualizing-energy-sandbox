import {
    Box,
    Flex,
    Heading,
    Image,
    Link,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import { copyFile } from "fs";
import React from "react";
import { nuclearList } from "../data/articleList";
import { TOPICS_LIST } from "../data/topicList";
import { Article, Topic } from "../types/types";
import { ArticleComponent } from "./Article";
import { ArticleList } from "./ArticleList";
import { Layout } from "./Layout";
import TableauEditor from "./TableauEditor";
interface Props {
    topicTitle: string;
    subTopicList: Topic;
    heroText?: string;
    heroImage?: string;
    articleList?: Array<Article>;
    color: string;
}
export const TopicLandingComponent = ({
    topicTitle,
    subTopicList,
    heroText,
    heroImage,
    articleList,
    color,
}: Props) => {
    return (
        <Flex width="100%" justifyContent="center">
            <Tabs defaultIndex={0} isLazy isFitted width="100%">
                <Box title={topicTitle}>
                    <Flex
                        width="100%"
                        justifyContent="space-between"
                        // borderBottom={"1px solid" + color}
                        pb="12px"
                    >
                        <TabList width="100%">
                            <Box display="none">
                                <Tab></Tab>
                            </Box>
                            {subTopicList.children?.map((subTopic) => (
                                <Tab
                                    key={subTopic.title}
                                    _selected={{
                                        borderBottom: "4px solid " + color,
                                    }}
                                >
                                    {subTopic.title}
                                </Tab>
                            ))}
                        </TabList>
                    </Flex>

                    <TabPanels width="100%">
                        <TabPanel>
                            <Flex
                                border="1px solid black"
                                padding="24px"
                                mt="24px"
                                justifyContent="space-between"
                                borderRadius={3}
                                width="100%"
                            >
                                <Flex
                                    justifyContent="center"
                                    padding="24px"
                                    width="50%"
                                >
                                    {heroText}
                                </Flex>
                                <Box>
                                    <Image src={heroImage} />
                                </Box>
                            </Flex>
                            <Heading color={color}>Featured Articles</Heading>
                            <ArticleList
                                articleList={articleList}
                                color={color}
                            />
                        </TabPanel>
                        {TOPICS_LIST[0]?.children?.map((subtopic) => (
                            <TabPanel key={subtopic.title}>
                                <TableauEditor
                                    initialValue={[
                                        {
                                            type: "paragraph",
                                            children: [
                                                {
                                                    text: "",
                                                },
                                            ],
                                        },
                                    ]}
                                    storageId={subtopic.storageId}
                                ></TableauEditor>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Box>
            </Tabs>
        </Flex>
    );
};
