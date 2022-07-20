import React from "react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";

export const JusticeAndEquity = () => {
    return (
        <Layout title={null}>
            <TableauEditor
                initialValue={initialValue}
                storageId="justicyandequity"
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
