import React from "react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";

export const Trade = () => {
    return (
        <Layout title={null}>
            <TableauEditor initialValue={initialValue} storageId="trade" />
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
