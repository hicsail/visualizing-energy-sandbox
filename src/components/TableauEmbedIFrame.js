import { Box } from "@chakra-ui/react";
import React, { useRef, useMemo, useState, useContext, useEffect } from "react";
import "./resizable.css";

const TableauEmbedIFrame = ({ html, containerId, title }) => {
  return (
    <Box
      width="100%"
      height="0"
      // paddingBottom={((height / width) * 100).toString() + "%"}
      position="relative"
    >
      <iframe
        srcDoc={html}
        pointerEvents="none"
        title={containerId}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      ></iframe>
    </Box>
  );
};

export default TableauEmbedIFrame;
