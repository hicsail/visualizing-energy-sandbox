import { Box, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import { nuclearList } from "../data/articleList";
import { Article, Topic } from "../types/types";
import { ArticleList } from "./ArticleList";
import { Layout } from "./Layout";
interface Props {
  topicTitle: string;
  subTopicList: Topic;
  heroText?: string;
  heroImage?: string;
  articleList?: Array<Article>;
}
export const TopicLandingComponent = ({
  topicTitle,
  subTopicList,
  heroText,
  heroImage,
  articleList,
}: Props) => {
  return (
    <Box title={topicTitle}>
      <Flex justifyContent="space-between">
        {subTopicList.children?.map((subTopic) => (
          <Box key={subTopic.title}>
            <Link href={subTopic.href}>{subTopic.title}</Link>
          </Box>
        ))}
      </Flex>
      <Flex border="2px solid black">
        <Box>{heroText}</Box>
        <Box>
          <Image src={heroImage} />
        </Box>
      </Flex>
      {articleList?.map((article) => (
        <ArticleList articleList={nuclearList} />
      ))}
    </Box>
  );
};
