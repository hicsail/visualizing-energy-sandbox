import React, {
  useMemo,
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  useSlateStatic,
  ReactEditor,
  useSlate,
  useSelected,
  useFocused,
} from "slate-react";
import { v4 as uuidv4 } from "uuid";
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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
  AspectRatio,
  Icon,
  Heading,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import PlainText from "./PlainText";
import { UserContext } from "../UserContext";
// import TableauEmbed from "./TableauEmbed";
// import TableauEmbedIFrame from "./TableauEmbedIFrame";
import { ResizableBox } from "react-resizable";
// import ResizableBox from "./ ResizableBox";
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
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const TableauEditor = (props) => {
  const storageIdString = JSON.stringify(props.storageId);

  const editor = useMemo(
    () =>
      withTableauwithTextHTML(
        withTableauHTML(
          withTableauwithText(
            withTableau(withHistory(withReact(createEditor())))
          )
        )
      ),

    []
  );

  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem(storageIdString)) || props.initialValue,
    [props.initialValue]
  );

  // const [isReadOnly, setisReadOnly] = useState(false);
  const { isAdmin, setisAdmin } = useContext(UserContext);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

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
          <Box borderBottom="2px solid #eee" padding="8px 0px 8px 0px">
            <MarkButton format="bold" icon="format_bold" />
            <MarkButton format="italic" icon="format_italic" />
            <MarkButton format="underline" icon="format_underlined" />
            <MarkButton format="superscript" icon="format_superscript" />
            <MarkButton format="subscript" icon="format_subscript" />

            <BlockButton format="heading-one" icon="looks_one" />
            <BlockButton format="heading-two" icon="looks_two" />
            <BlockButton format="left" icon="format_align_left" />
            <BlockButton format="center" icon="format_align_center" />
            <BlockButton format="right" icon="format_align_right" />
            <BlockButton format="justify" icon="format_align_justify" />
            <FontColorButton />
            <FontSizeButton />
          </Box>
          <Box padding="8px 0px 8px 0px">
            <InsertTableauEmbedWithHTMLButton />
            <InsertTableauWithTextWithHTMLButton isLeft={true} />
            <InsertTableauWithTextWithHTMLButton isLeft={false} />
          </Box>

          {/* <InsertTableauEmbedButton />
          <InsertTableauWithTextButton isLeft={true} />
          <InsertTableauWithTextButton isLeft={false} /> */}
        </Box>
      ) : (
        <></>
      )}

      <Editable
        readOnly={!isAdmin}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some text..."
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

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
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

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
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

const withTableauHTML = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "tableau-html" ? true : isVoid(element);
  return editor;
};

const withTableauwithTextHTML = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "tableau-text-html" ? true : isVoid(element);
  return editor;
};

const withTableau = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "tableau" ? true : isVoid(element);
  return editor;
};

const withTableauwithText = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "tableau-text" ? true : isVoid(element);
  return editor;
};

const insertTableau = (editor, url) => {
  const text = { text: "" };
  const containerId = uuidv4();

  const voidNode = {
    type: "tableau",
    url: url,
    title: "Title",
    containerName: containerId,
    tag: "Tag",
    height: 300,
    width: 300,
    centerPosition: 50,
    children: [text],
  };

  const emptyText = {
    type: "paragraph",
    children: [text],
  };
  Transforms.insertNodes(editor, voidNode);
  Transforms.insertNodes(editor, emptyText);
};

const insertTableauWithText = (editor, url, textOnLeft) => {
  const text = { text: "" };
  const containerId = uuidv4();

  const voidNode = {
    type: "tableau-text",
    url: url,
    title: "Title",
    containerName: containerId,
    tag: "Tag",
    textOnLeft: textOnLeft,
    height: 300,
    width: 300,
    centerPosition: 50,
    children: [text],
  };

  const emptyText = {
    type: "paragraph",
    children: [text],
  };
  Transforms.insertNodes(editor, emptyText);
  Transforms.insertNodes(editor, voidNode);
  Transforms.insertNodes(editor, emptyText);
};

const insertTableauHTML = (editor, html) => {
  const text = { text: "" };
  const containerId = uuidv4();

  const voidNode = {
    type: "tableau-html",
    // url: url,
    html: html,
    title: "Title",
    containerName: containerId,
    tag: "Tag",
    height: 300,
    width: 300,
    centerPosition: 50,
    children: [text],
  };

  const emptyText = {
    type: "paragraph",
    children: [text],
  };
  Transforms.insertNodes(editor, emptyText);
  Transforms.insertNodes(editor, voidNode);
  Transforms.insertNodes(editor, emptyText);
};

const insertTableauWithTextHTML = (editor, html, textOnLeft) => {
  const text = { text: "" };
  const containerId = uuidv4();

  const voidNode = {
    type: "tableau-text-html",
    // url: url,
    html: html,
    title: "Title",
    containerName: containerId,
    tag: "Tag",
    textOnLeft: textOnLeft,
    height: 300,
    width: 300,
    centerPosition: 50,
    children: [text],
  };

  const emptyText = {
    type: "paragraph",
    children: [text],
  };
  Transforms.insertNodes(editor, emptyText);
  Transforms.insertNodes(editor, voidNode);
  Transforms.insertNodes(editor, emptyText);
};

const Element = (props) => {
  const { attributes, children, element } = props;
  const style = { textAlign: element.align };
  switch (element.type) {
    case "heading-one":
      return (
        <Heading as="h1" style={style} {...attributes}>
          {children}
        </Heading>
      );
    case "heading-two":
      return (
        <Heading as="h2" style={style} {...attributes}>
          {children}
        </Heading>
      );
    case "tableau":
      return <TableauElement {...props} />;
    case "tableau-text":
      return <TableauWithTextElement {...props} />;
    case "tableau-html":
      return <TableauHTMLElement {...props} />;
    case "tableau-text-html":
      return <TableauWithTextHTMLElement {...props} />;
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>;
  }

  if (leaf.fontSize) {
    children = <span style={{ fontSize: leaf.fontSize }}>{children}</span>;
  }

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

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }

  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }

  return (
    <span
      {...attributes}
      // style={{ color: leaf.color, fontSize: leaf.fontSize }}
    >
      {children}
    </span>
  );
};

const TableauWithTextElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  // const [inputValue, setInputValue] = useState("");
  const path = ReactEditor.findPath(editor, element);
  const {
    url,
    containerName,
    title,
    tag,
    textOnLeft,
    height,
    width,
    centerPosition,
  } = element;
  const { isAdmin, setisAdmin } = useContext(UserContext);
  const selected = useSelected();
  const focused = useFocused();
  const [resizeInProgress, setResizeInProgress] = React.useState(false);
  const iFrameStyle = {
    zIndex: -1,
    position: "absolute",
    width: "100%",
    height: "100%",
  };
  const leftRef = useRef(containerName + "left");
  const rightRef = useRef(containerName + "right");
  const [sliderValue, setSliderValue] = useState(centerPosition);

  useEffect(() => {
    Transforms.setNodes(
      editor,
      {
        centerPosition: sliderValue,
      },
      { at: path }
    );
  }, [sliderValue]);

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <Box boxShadow={selected && focused ? "0 0 0 3px #B4D5FF" : "none"}>
          {isAdmin ? (
            <Slider
              aria-label="slider-ex-1"
              onChangeEnd={(val) => setSliderValue(val)}
              defaultValue={sliderValue}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          ) : (
            <></>
          )}
          {textOnLeft ? (
            <Box display="flex" alignItems="center">
              <Box width={sliderValue.toString() + "%"}>
                <PlainText />
              </Box>
              <Box width={(100 - sliderValue).toString() + "%"}>
                {/* <tableau-viz id={containerName} src={url}></tableau-viz> */}
                {isAdmin ? (
                  <ResizableBox
                    ref={leftRef}
                    width={width}
                    height={height}
                    draggableOpts={{ grid: [5, 5] }}
                    onResizeStart={() => setResizeInProgress(true)}
                    onResizeStop={(e) => {
                      setResizeInProgress(false);

                      try {
                        Transforms.setNodes(
                          editor,
                          {
                            height: leftRef.current.state.height,
                            width: leftRef.current.state.width,
                          },
                          { at: path }
                        );
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  >
                    <tableau-viz
                      id={containerName}
                      src={url}
                      height="100%"
                      width="100%"
                    ></tableau-viz>
                  </ResizableBox>
                ) : (
                  <Box width={width} height={height}>
                    <tableau-viz
                      id={containerName}
                      src={url}
                      height="100%"
                      width="100%"
                    ></tableau-viz>
                  </Box>
                )}

                {isAdmin ? (
                  <Button
                    onClick={() => Transforms.removeNodes(editor, { at: path })}
                  >
                    Delete
                  </Button>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <Box width={sliderValue.toString() + "%"}>
                {/* <tableau-viz id={containerName} src={url}></tableau-viz> */}
                {isAdmin ? (
                  <ResizableBox
                    ref={rightRef}
                    width={width}
                    height={height}
                    draggableOpts={{ grid: [5, 5] }}
                    onResizeStart={() => setResizeInProgress(true)}
                    onResizeStop={(e) => {
                      setResizeInProgress(false);

                      try {
                        Transforms.setNodes(
                          editor,
                          {
                            height: leftRef.current.state.height,
                            width: leftRef.current.state.width,
                          },
                          { at: path }
                        );
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  >
                    <tableau-viz
                      id={containerName}
                      src={url}
                      height="100%"
                      width="100%"
                    ></tableau-viz>
                  </ResizableBox>
                ) : (
                  <Box width={width} height={height}>
                    <tableau-viz
                      id={containerName}
                      src={url}
                      height="100%"
                      width="100%"
                    ></tableau-viz>
                  </Box>
                )}

                {isAdmin ? (
                  <Button
                    onClick={() => Transforms.removeNodes(editor, { at: path })}
                  >
                    Delete
                  </Button>
                ) : (
                  <></>
                )}
              </Box>
              <Box width={(100 - sliderValue).toString() + "%"}>
                <PlainText containerName={containerName} />
              </Box>
            </Box>
          )}
        </Box>
      </div>
      {children}
    </div>
  );
};

const TableauElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { isAdmin, setisAdmin } = useContext(UserContext);
  const selected = useSelected();
  const focused = useFocused();
  const [resizeInProgress, setResizeInProgress] = React.useState(false);
  const iFrameStyle = {
    zIndex: -1,
    position: "absolute",
    width: "100%",
    height: "100%",
  };
  const { url, containerName, title, tag, height, width, centerPosition } =
    element;
  const ElementRef = useRef(containerName + "resize");

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <Box boxShadow={selected && focused ? "0 0 0 3px #B4D5FF" : "none"}>
          {isAdmin ? (
            <ResizableBox
              ref={ElementRef}
              width={width}
              height={height}
              draggableOpts={{ grid: [5, 5] }}
              onResizeStart={() => setResizeInProgress(true)}
              onResizeStop={(e) => {
                setResizeInProgress(false);

                try {
                  Transforms.setNodes(
                    editor,
                    {
                      height: ElementRef.current.state.height,
                      width: ElementRef.current.state.width,
                    },
                    { at: path }
                  );
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <tableau-viz
                id={containerName}
                src={url}
                height="100%"
                width="100%"
              ></tableau-viz>
            </ResizableBox>
          ) : (
            <Box width={width} height={height}>
              <tableau-viz
                id={containerName}
                src={url}
                height="100%"
                width="100%"
              ></tableau-viz>
            </Box>
          )}
          {isAdmin ? (
            <Button
              onClick={() => Transforms.removeNodes(editor, { at: path })}
            >
              Delete
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </div>
      {children}
    </div>
  );
};

const TableauHTMLElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { isAdmin, setisAdmin } = useContext(UserContext);
  const selected = useSelected();
  const focused = useFocused();
  const [resizeInProgress, setResizeInProgress] = React.useState(false);
  const iFrameStyle = {
    zIndex: -1,
    position: "absolute",
    width: "100%",
    height: "100%",
  };
  const { html, containerName, title, tag, height, width, centerPosition } =
    element;
  const ElementRef = useRef(containerName + "resize");

  return (
    <div
      {...attributes}
      // maxHeight={height + "px"}
    >
      <div contentEditable={false}>
        <Box
          boxShadow={selected && focused ? "0 0 0 3px #B4D5FF" : "none"}
          maxHeight={height}
        >
          <Box
            // width="100%"
            height="100%"
            maxHeight={height + "px"}
          >
            {isAdmin ? (
              <ResizableBox
                ref={ElementRef}
                width={width}
                height={height}
                draggableOpts={{ grid: [5, 5] }}
                onResizeStart={() => setResizeInProgress(true)}
                onResizeStop={(e) => {
                  setResizeInProgress(false);

                  try {
                    console.log(((height / width) * 100).toString() + "%");
                    Transforms.setNodes(
                      editor,
                      {
                        height: ElementRef.current.state.height,
                        width: ElementRef.current.state.width,
                      },
                      { at: path }
                    );
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                <iframe
                  srcDoc={html}
                  pointerEvents="none"
                  title={containerName}
                  style={
                    resizeInProgress
                      ? iFrameStyle
                      : {
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                        }
                  }
                ></iframe>
              </ResizableBox>
            ) : (
              <Box maxHeight={height} maxWidth={width}>
                <Box
                  overflow="hidden"
                  paddingTop={((height / width) * 100).toString() + "%"}
                  position="relative"
                >
                  <iframe
                    srcDoc={html}
                    pointerEvents="none"
                    title={containerName}
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      left: "0",
                      top: "0",
                    }}
                  ></iframe>
                </Box>
              </Box>
            )}
            {isAdmin ? (
              <Button
                onClick={() =>
                  Transforms.removeNodes(editor, {
                    at: path,
                  })
                }
                position="absolute"
                top="0.5e"
                left="0.5em"
              >
                Delete
              </Button>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </div>
      {children}
    </div>
  );
};

const TableauWithTextHTMLElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  // const [inputValue, setInputValue] = useState("");
  const path = ReactEditor.findPath(editor, element);
  const {
    containerName,
    title,
    html,
    textOnLeft,
    width,
    height,
    centerPosition,
  } = element;
  const { isAdmin, setisAdmin } = useContext(UserContext);
  const selected = useSelected();
  const focused = useFocused();
  const [resizeInProgress, setResizeInProgress] = React.useState(false);
  const iFrameStyle = {
    zIndex: -1,
  };
  const leftRef = useRef(containerName + "left");
  const rightRef = useRef(containerName + "right");
  const [sliderValue, setSliderValue] = useState(centerPosition);

  useEffect(() => {
    Transforms.setNodes(
      editor,
      {
        centerPosition: sliderValue,
      },
      { at: path }
    );
  }, [sliderValue]);

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div>
          {isAdmin ? (
            <Slider
              aria-label="slider-ex-5"
              onChangeEnd={(val) => setSliderValue(val)}
              defaultValue={sliderValue}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          ) : (
            <></>
          )}
          {textOnLeft ? (
            <Box display="flex" alignItems="center">
              <Box width={sliderValue.toString() + "%"}>
                <PlainText />
              </Box>
              <Box width={(100 - sliderValue).toString() + "%"}>
                <Box
                // width="100%"
                // height="100%"
                >
                  <Box>
                    {isAdmin ? (
                      <ResizableBox
                        ref={leftRef}
                        width={width}
                        height={height}
                        draggableOpts={{ grid: [5, 5] }}
                        onResizeStart={() => setResizeInProgress(true)}
                        onResizeStop={(e) => {
                          setResizeInProgress(false);
                          console.log(
                            "Aspect Ratio: " +
                              ((height / width) * 100).toString() +
                              "%"
                          );

                          console.log(
                            "height: " + leftRef.current.state.height
                          );
                          console.log("width: " + leftRef.current.state.width);

                          try {
                            Transforms.setNodes(
                              editor,
                              {
                                height: leftRef.current.state.height,
                                width: leftRef.current.state.width,
                              },
                              { at: path }
                            );
                          } catch (e) {
                            console.log(e);
                          }
                        }}
                      >
                        <iframe
                          srcDoc={html}
                          pointerEvents="none"
                          title={containerName}
                          style={
                            resizeInProgress
                              ? iFrameStyle
                              : {
                                  position: "absolute",
                                  width: "100%",
                                  height: "100%",
                                }
                          }
                        ></iframe>
                      </ResizableBox>
                    ) : (
                      <Box maxHeight={height} maxWidth={width}>
                        <Box
                          overflow="hidden"
                          paddingTop={((height / width) * 100).toString() + "%"}
                          position="relative"
                        >
                          <iframe
                            srcDoc={html}
                            pointerEvents="none"
                            title={containerName}
                            style={{
                              position: "absolute",
                              height: "100%",
                              width: "100%",
                              left: "0",
                              top: "0",
                            }}
                          ></iframe>
                        </Box>
                      </Box>
                    )}

                    {isAdmin ? (
                      <Button
                        onClick={() =>
                          Transforms.removeNodes(editor, {
                            at: path,
                          })
                        }
                      >
                        Delete
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <Box width={sliderValue.toString() + "%"}>
                <Box
                  // width="100%"
                  height="100%"
                >
                  {isAdmin ? (
                    <ResizableBox
                      ref={leftRef}
                      width={width}
                      height={height}
                      draggableOpts={{ grid: [5, 5] }}
                      onResizeStart={() => setResizeInProgress(true)}
                      onResizeStop={(e) => {
                        setResizeInProgress(false);
                        console.log(
                          "Aspect Ratio: " +
                            ((height / width) * 100).toString() +
                            "%"
                        );

                        try {
                          Transforms.setNodes(
                            editor,
                            {
                              height: leftRef.current.state.height,
                              width: leftRef.current.state.width,
                            },
                            { at: path }
                          );
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      <iframe
                        srcDoc={html}
                        pointerEvents="none"
                        title={containerName}
                        style={
                          resizeInProgress
                            ? iFrameStyle
                            : {
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                              }
                        }
                      ></iframe>
                    </ResizableBox>
                  ) : (
                    <Box maxHeight={height} maxWidth={width}>
                      <Box
                        overflow="hidden"
                        paddingTop={((height / width) * 100).toString() + "%"}
                        position="relative"
                      >
                        <iframe
                          srcDoc={html}
                          pointerEvents="none"
                          title={containerName}
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            left: "0",
                            top: "0",
                          }}
                        ></iframe>
                      </Box>
                    </Box>
                  )}
                  {isAdmin ? (
                    <Button
                      onClick={() =>
                        Transforms.removeNodes(editor, {
                          at: path,
                        })
                      }
                    >
                      Delete
                    </Button>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
              <Box width={(100 - sliderValue).toString() + "%"}>
                <PlainText />
              </Box>
            </Box>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

const InsertTableauEmbedButton = () => {
  const editor = useSlateStatic();
  const [tabUrl, setTabUrl] = useState("");
  const handleChange = (event) => setTabUrl(event.target.value);

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost">Tableau</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Insert Url</PopoverHeader>
        <PopoverBody>
          <Input value={tabUrl} onChange={handleChange}></Input>
          <Button
            onMouseDown={(event) => {
              event.preventDefault();
              insertTableau(editor, tabUrl);
            }}
          >
            Submit
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const InsertTableauWithTextButton = ({ isLeft }) => {
  const editor = useSlateStatic();
  const [tabUrl, setTabUrl] = useState("");
  const handleChange = (event) => setTabUrl(event.target.value);

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" borderRadius={3}>
          Tableau Text On {isLeft ? "Left" : "Right"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Insert Url</PopoverHeader>
        <PopoverBody>
          <Input value={tabUrl} onChange={handleChange}></Input>
          <Button
            onMouseDown={(event) => {
              event.preventDefault();
              insertTableauWithText(editor, tabUrl, isLeft);
            }}
          >
            Submit
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const InsertTableauEmbedWithHTMLButton = () => {
  const editor = useSlateStatic();
  const [html, setHtml] = useState("");
  const handleChange = (event) => setHtml(event.target.value);

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" borderRadius={3}>
          Tableau with HTML
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Insert HTML Embed</PopoverHeader>
        <PopoverBody>
          <Input value={html} onChange={handleChange}></Input>
          <Button
            borderRadius={3}
            onMouseDown={(event) => {
              event.preventDefault();
              insertTableauHTML(editor, html);
            }}
          >
            Submit
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const InsertTableauWithTextWithHTMLButton = ({ isLeft }) => {
  const editor = useSlateStatic();
  const [html, setHtml] = useState("");
  const handleChange = (event) => setHtml(event.target.value);

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" borderRadius={3}>
          Tableau Text with HTML On {isLeft ? "Left" : "Right"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Insert HTML Embed</PopoverHeader>
        <PopoverBody>
          <Input value={html} onChange={handleChange}></Input>
          <Button
            onMouseDown={(event) => {
              event.preventDefault();
              insertTableauWithTextHTML(editor, html, isLeft);
            }}
          >
            Submit
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
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
            return <TbUnderline />;
          case "format_underlined":
            return <TbItalic />;
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

export default TableauEditor;
