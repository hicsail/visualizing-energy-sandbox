import { Box } from "@chakra-ui/react";
import React, { useRef, useMemo, useState, useContext, useEffect } from "react";
import {
  TableauViz,
  TableauEventType,
} from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";

const TableauEmbed = ({ url, containerId, title, height, width }) => {
  const vizContainer = useRef(containerId);
  // let viz;
  // let viz = document.getElementById(vizContainer.current);
  // console.log(viz);
  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     console.log(
  //       `Resizing the window ${window.innerHeight}, ${window.innerWidth}`
  //     );
  //     reSizeFixedDashboard();
  //   });
  // }, [window.innerWidth, window.innerHeight]);

  // const options = {
  //   height: height,
  //   width: width,
  //   hideToolbar: true,
  // };

  // function autoResize() {
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;

  //   viz.setFrameSize(width, height);
  // }

  // function reSizeFixedDashboard() {
  //   const sheet = viz.workbook.activeSheet;
  //   sheet
  //     .changeSizeAsync({
  //       behavior: "EXACTLY",
  //       maxSize: {
  //         height: window.innerHeight,
  //         width: window.innerWidth,
  //       },
  //     })
  //     .then(viz.setFrameSize(window.innerWidth, window.innerHeight));
  // }
  return (
    <Box>
      <tableau-viz
        id={vizContainer.current}
        src={url}
        height="100%"
        width="100%"
      ></tableau-viz>
    </Box>
  );
};

export default TableauEmbed;
