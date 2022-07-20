import React from "react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";

export const GeothermalEnergy = () => {
    return (
        <Layout title={null}>
            <TableauEditor initialValue={initialValue} storageId="geothermal" />
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
