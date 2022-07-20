import React from "react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";

export const SolarEnergy = () => {
    return (
        <Layout title={null}>
            <TableauEditor
                initialValue={initialValue}
                storageId="solarenergy"
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
