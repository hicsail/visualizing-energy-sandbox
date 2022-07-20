import React from "react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";

export const Availability = () => {
    return (
        <Layout title={null}>
            <TableauEditor
                initialValue={initialValue}
                storageId="availability"
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
