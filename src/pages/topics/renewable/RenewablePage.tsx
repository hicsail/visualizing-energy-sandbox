import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";
import { TopicLandingComponent } from "../../../components/TopicLandingComponent";
import { TOPICS_LIST } from "../../../data/topicList";
import { renewableList } from "../../../data/articleList";

const titleStyle = {
    justifyContent: "center",
    paddingTop: "2rem",
};

export const Renewable = () => {
    return (
        <Layout title="Renewable Energy" style={titleStyle}>
            <TopicLandingComponent
                topicTitle="Nuclear"
                subTopicList={TOPICS_LIST[2]}
                heroText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Ullamcorper malesuada proin libero nunc. Viverra maecenas accumsan lacus vel facilisis. Cras ornare arcu dui vivamus arcu felis. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Magnis dis parturient montes nascetur. Dignissim cras tincidunt lobortis feugiat vivamus. Semper feugiat nibh sed pulvinar. Tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Parturient montes nascetur ridiculus mus. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Elit sed vulputate mi sit amet. Lorem sed risus ultricies tristique nulla aliquet enim tortor.                
                "
                heroImage="https://picsum.photos/id/237/500/500"
                articleList={renewableList}
                color="#1E941E"
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
