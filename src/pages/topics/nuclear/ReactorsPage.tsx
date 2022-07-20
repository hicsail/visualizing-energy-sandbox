import React from "react";
import { Layout } from "../../../components/Layout";
import TableauEditor from "../../../components/TableauEditor";

export const Reactors = () => {
    return (
        <Layout title={null}>
            <TableauEditor
                initialValue={initialValue}
                storageId="reactors3232"
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
