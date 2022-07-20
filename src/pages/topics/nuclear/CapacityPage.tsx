import React from "react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";

export const Capacity = () => {
    return (
        <Layout title={null}>
            <TableauEditor initialValue={initialValue} storageId="capacity" />
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
