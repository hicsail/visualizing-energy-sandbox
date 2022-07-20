import React from "react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";

export const BioEnergy = () => {
    return (
        <Layout title={null}>
            <TableauEditor initialValue={initialValue} storageId="bioenergy" />
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
