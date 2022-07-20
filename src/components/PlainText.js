import React, { useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

const PlainText = (props) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    // console.log(props.containerName);

    // const initialValue = useMemo(
    //   () => JSON.parse(localStorage.getItem(props.containerName)) || initialVal
    // );

    return (
        <Slate editor={editor} value={initialVal}>
            <Editable placeholder="Enter some plain text..." />
        </Slate>
    );
};

const initialVal = [
    {
        type: "paragraph",
        children: [
            { text: "This is editable plain text, just like a <textarea>!" },
        ],
    },
];

export default PlainText;
