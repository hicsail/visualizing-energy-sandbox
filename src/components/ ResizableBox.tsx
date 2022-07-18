import { Box } from "@chakra-ui/react";
import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../UserContext";
import { useResize } from "../utils/useResize";

// const Resizable = (props: any) => {
//   return (
//     <Box ref={props.ref} padding="20px" bgColor="teal" position="relative">
//       {props.children}
//     </Box>
//   );
// };

const Handle = (props: any) => {
  return (
    <Box
      borderBottom="0 solid transparent"
      borderRight="15px solid black"
      borderTop="15px solid transparent"
      bottom="0"
      //   cursor="props.cursor"
      display="inline-block"
      height="0"
      position="absolute"
      right="0"
      width="0"
      cursor={props.cursor}
      onMouseDown={props.onMouseDown}
    ></Box>
  );
};

const ResizableBox = ({ children, containerName }: any) => {
  const ref = React.useRef(containerName);
  const options = {
    step: 40,
  };
  const { initResize, size, cursor } = useResize(ref, options);
  const { isAdmin, setisAdmin } = useContext(UserContext);

  return (
    <Box>
      <Box
        ref={ref}
        padding="20px"
        // bgColor="teal"
        position="relative"
      >
        {children(size)}
        <Box
          display={isAdmin ? "inline-block" : "none"}
          cursor={cursor}
          onMouseDown={initResize}
          borderBottom="0 solid transparent"
          borderRight="15px solid black"
          borderTop="15px solid transparent"
          bottom="0"
          // display="inline-block"
          height="0"
          position="absolute"
          right="0"
          width="0"
        />
      </Box>
    </Box>
  );
};

export default ResizableBox;
