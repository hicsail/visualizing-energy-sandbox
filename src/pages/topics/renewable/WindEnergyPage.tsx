import React from "react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";

export const WindEnergy = () => {
    return (
        <Layout title={null}>
            <TableauEditor initialValue={initialValue} storageId="windenergy" />
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
