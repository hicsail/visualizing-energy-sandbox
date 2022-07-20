import React from "react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";

export const WellBeing = () => {
    return (
        <Layout title={null}>
            <TableauEditor initialValue={initialValue} storageId="wellbeing" />
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
