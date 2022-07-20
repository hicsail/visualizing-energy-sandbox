import React, {
    useMemo,
    useState,
    useCallback,
    useEffect,
    useContext,
} from "react";
import {
    Editor,
    Transforms,
    createEditor,
    Element as SlateElement,
} from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import {
    Button,
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Input,
    Icon,
    SimpleGrid,
} from "@chakra-ui/react";
import { UserContext } from "../UserContext";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";
import {
    TbNumber1,
    TbNumber2,
    TbBold,
    TbUnderline,
    TbItalic,
    TbAlignLeft,
    TbAlignCenter,
    TbAlignRight,
    TbAlignJustified,
    TbSuperscript,
    TbSubscript,
} from "react-icons/tb";
import { AiOutlineFontSize, AiOutlineFontColors } from "react-icons/ai";
import "../components/resizable.css";

const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const RichTextExample = (props) => {
    const storageIdString = props.storageId;
    // const storageIdString = JSON.stringify(props.storageId);
    const initialValue = useMemo(
        () =>
            JSON.parse(localStorage.getItem(storageIdString)) ||
            props.initialValue,
        [props.initialValue]
    );

    const { isAdmin, setisAdmin } = useContext(UserContext);
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Slate
            editor={editor}
            value={initialValue}
            onChange={(value) => {
                const isAstChange = editor.operations.some(
                    (op) => "set_selection" !== op.type
                );
                if (isAstChange) {
                    // Save the value to Local Storage.
                    const content = JSON.stringify(value);
                    localStorage.setItem(storageIdString, content);
                }
            }}
        >
            {isAdmin ? (
                <Box
                    position="relative"
                    borderBottom="2px solid #eee"
                    borderTop="2px solid #eee"
                    display={isAdmin ? "" : "none"}
                >
                    <Box
                        borderBottom="2px solid #eee"
                        padding="8px 0px 8px 0px"
                    >
                        <MarkButton format="bold" icon="format_bold" />
                        <MarkButton format="italic" icon="format_italic" />
                        <MarkButton
                            format="underline"
                            icon="format_underlined"
                        />
                        <MarkButton
                            format="superscript"
                            icon="format_superscript"
                        />
                        <MarkButton
                            format="subscript"
                            icon="format_subscript"
                        />

                        <BlockButton format="heading-one" icon="looks_one" />
                        <BlockButton format="heading-two" icon="looks_two" />
                        <BlockButton format="left" icon="format_align_left" />
                        <BlockButton
                            format="center"
                            icon="format_align_center"
                        />
                        <BlockButton format="right" icon="format_align_right" />
                        <BlockButton
                            format="justify"
                            icon="format_align_justify"
                        />
                        <FontColorButton />
                        <FontSizeButton />
                    </Box>
                </Box>
            ) : (
                <></>
            )}
            <Editable
                readOnly={!isAdmin}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
                onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event)) {
                            event.preventDefault();
                            const mark = HOTKEYS[hotkey];
                            toggleMark(editor, mark);
                        }
                    }
                }}
            />
        </Slate>
    );
};

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
    );
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    });
    let newProperties;
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        };
    } else {
        newProperties = {
            type: isActive ? "paragraph" : isList ? "list-item" : format,
        };
    }
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor, format, blockType = "type") => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n[blockType] === format,
        })
    );

    return !!match;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align };
    switch (element.type) {
        case "block-quote":
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            );
        case "bulleted-list":
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            );
        case "heading-one":
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            );
        case "heading-two":
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            );
        case "list-item":
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            );
        case "numbered-list":
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            );
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            );
    }
};

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            variant="ghost"
            color={
                isBlockActive(
                    editor,
                    format,
                    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
                )
                    ? "grey"
                    : "black"
            }
            borderRadius={3}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            {(() => {
                switch (icon) {
                    case "looks_one":
                        return <TbNumber1 />;
                    case "looks_two":
                        return <TbNumber2 />;
                    case "format_align_left":
                        return <TbAlignLeft />;
                    case "format_align_center":
                        return <TbAlignCenter />;
                    case "format_align_right":
                        return <TbAlignRight />;
                    case "format_align_justify":
                        return <TbAlignJustified />;
                    default:
                        return <Icon />;
                }
            })()}
        </Button>
    );
};

const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            variant="ghost"
            color={isMarkActive(editor, format) ? "grey" : "black"}
            borderRadius={3}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            {(() => {
                switch (icon) {
                    case "format_bold":
                        return <TbBold />;
                    case "format_italic":
                        return <TbItalic />;
                    case "format_underlined":
                        return <TbUnderline />;
                    case "format_superscript":
                        return <TbSuperscript />;
                    case "format_subscript":
                        return <TbSubscript />;
                    default:
                        return <Icon />;
                }
            })()}{" "}
        </Button>
    );
};

const FontColorButton = () => {
    const editor = useSlate();
    const [color, setColor] = useState("#000000");
    const colors = ["#000000", "#7d5266", "#5d94a3", "#6d8643"];

    useEffect(() => {
        Editor.addMark(editor, "color", color);
        console.log(editor);
        // Transforms.setNodes(editor, { color: color });
    }, [color]);

    return (
        <Popover variant="picker">
            <PopoverTrigger>
                <Button aria-label={color} variant="ghost" borderRadius={3}>
                    <AiOutlineFontColors />
                </Button>
            </PopoverTrigger>
            <PopoverContent width="170px">
                <PopoverArrow bg={color} />
                <PopoverCloseButton color="white" />
                <PopoverHeader
                    height="100px"
                    backgroundColor={color}
                    borderTopLeftRadius={5}
                    borderTopRightRadius={5}
                    color="white"
                >
                    <Box height="100%">{color}</Box>
                </PopoverHeader>
                <PopoverBody height="120px">
                    <SimpleGrid columns={5} spacing={2}>
                        {colors.map((c) => (
                            <Button
                                key={c}
                                aria-label={c}
                                background={c}
                                height="22px"
                                width="22px"
                                padding={0}
                                minWidth="unset"
                                borderRadius={3}
                                _hover={{ background: c }}
                                onClick={() => {
                                    setColor(c);
                                }}
                            ></Button>
                        ))}
                    </SimpleGrid>
                    <Input
                        borderRadius={3}
                        marginTop={3}
                        placeholder="red.100"
                        size="sm"
                        value={color}
                        onChange={(e) => {
                            setColor(e.target.value);
                        }}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

const FontSizeButton = () => {
    const editor = useSlate();
    const [fontSize, setFontSize] = useState(14);
    const fontSizes = [8, 10, 12, 14, 16, 18, 24, 28, 32];

    useEffect(() => {
        Editor.addMark(editor, "fontSize", fontSize);
    }, [fontSize]);

    return (
        <Popover variant="picker">
            <PopoverTrigger>
                <Button aria-label={fontSize} variant="ghost" borderRadius={3}>
                    <AiOutlineFontSize />
                </Button>
            </PopoverTrigger>
            <PopoverContent width="170px">
                <PopoverArrow />
                <PopoverCloseButton color="white" />
                <PopoverHeader
                    height="100px"
                    borderTopLeftRadius={5}
                    borderTopRightRadius={5}
                    color="white"
                >
                    <Box height="100%">{fontSize}</Box>
                </PopoverHeader>
                <PopoverBody height="120px">
                    <SimpleGrid columns={5} spacing={2}>
                        {fontSizes.map((f) => (
                            <Button
                                key={f}
                                aria-label={f}
                                // background={c}
                                height="22px"
                                width="22px"
                                padding={0}
                                minWidth="unset"
                                borderRadius={3}
                                // _hover={{ background: c }}
                                onClick={() => {
                                    setFontSize(f);
                                }}
                            >
                                {f}
                            </Button>
                        ))}
                    </SimpleGrid>
                    <Input
                        borderRadius={3}
                        marginTop={3}
                        placeholder="red.100"
                        size="sm"
                        value={fontSize}
                        onChange={(e) => {
                            setFontSize(e.target.value);
                        }}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default RichTextExample;
