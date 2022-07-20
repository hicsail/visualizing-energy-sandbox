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
import { ArticleComponent } from "./Article";

interface Props {
    articleList?: Array<Article>;
    color: string;
}

export const ArticleList: React.FC<Props> = ({ articleList, color }: Props) => {
    return (
        <Box>
            {articleList?.map((article) => (
                <Box key={article.title}>
                    <ArticleComponent article={article} color={color} />
                </Box>
            ))}
        </Box>
    );
};
