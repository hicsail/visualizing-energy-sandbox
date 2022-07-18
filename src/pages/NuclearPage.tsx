import React from "react";
import { Layout } from "../components/Layout";
import { TopicLandingComponent } from "../components/TopicLandingComponent";
import { nuclearList } from "../data/articleList";
import { TOPICS_LIST } from "../data/topicList";

const titleStyle = {
  justifyContent: "center",
  paddingTop: "2rem",
};

export const NuclearPage = () => {
  return (
    <Layout title="Nuclear Energy" style={titleStyle}>
      <TopicLandingComponent
        topicTitle="Nuclear"
        subTopicList={TOPICS_LIST[0]}
        heroText="Lorem Ipsum"
        heroImage="https://picsum.photos/id/237/200/300"
        articleList={nuclearList}
      />
    </Layout>
  );
};
