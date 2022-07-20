import React from "react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";

export const HydropowerEnergy = () => {
    return (
        <Layout title={null}>
            <TableauEditor initialValue={initialValue} storageId="hydropower" />
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
