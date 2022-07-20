import React from "react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";

export const Waste = () => {
    return (
        <Layout title={null}>
            <TableauEditor initialValue={initialValue} storageId="waste" />
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
