import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";
import { TopicLandingComponent } from "../../../components/TopicLandingComponent";
import { TOPICS_LIST } from "../../../data/topicList";
import { societyList } from "../../../data/articleList";

const titleStyle = {
    justifyContent: "center",
    paddingTop: "2rem",
};

export const Society = () => {
    return (
        <Layout title="Society" style={titleStyle}>
            <TopicLandingComponent
                topicTitle="Nuclear"
                subTopicList={TOPICS_LIST[1]}
                heroText="Lorem Ipsum"
                heroImage="https://picsum.photos/id/237/200/300"
                articleList={societyList}
                color="#007DD4"
            />
        </Layout>
    );
};
const initialValue = [
    {
        type: "paragraph",
        children: [
            {
                text: "",
            },
        ],
    },
];
