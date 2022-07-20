import {
    Box,
    Heading,
    Image,
    Link,
    Text,
    Flex,
    Button,
} from "@chakra-ui/react";
import React from "react";
import { Article } from "../types/types";

interface Props {
    article: Article;
    color: string;
}

export const ArticleComponent: React.FC<Props> = ({
    article,
    color,
}: Props) => {
    return (
        <Flex
            direction="column"
            borderBottom="2px solid black"
            p="20px 0px 20px 0px"
        >
            <Heading pb="24px">{article.title}</Heading>
            <Flex gap="30px">
                <Box width="100%">
                    <Image
                        maxWidth="100%"
                        height="10rem"
                        width="100%"
                        objectFit="cover"
                        src={article.imageUrl}
                    />
                </Box>
                <Flex
                    direction="column"
                    gap="30px"
                    justifyContent="space-between"
                >
                    <Text>{article.text}</Text>
                    <Flex justifyContent="space-between ">
                        <Text>Created by {article.author}</Text>
                        <Box>
                            <Button bg={color}>
                                <Link href={article.url} color="white">
                                    title
                                </Link>
                            </Button>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
