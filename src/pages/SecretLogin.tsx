import React, { useContext, useState, useRef } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { UserContext } from "../UserContext";
import { authenticate } from "../utils/auth";
import Cookies from "js-cookie";

export const SecretLogin = () => {
  const { isAdmin, setisAdmin } = useContext(UserContext);
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [errorMessages, setErrorMessages] = useState({});
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const usernameRef: any = useRef();
  const passwordRef: any = useRef();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const authenticated = await authenticate(username, password);

    if (authenticated) {
      setisAdmin(true);
      Cookies.set("user", "loginTrue");
    } else {
      setisAdmin(false);
    }
  };

  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" ref={usernameRef} />
        </label>
        <label>
          Password:
          <input type="text" name="password" ref={passwordRef} />
        </label>
        <Button
          type="submit"
          // onClick={async (event) => {
          //   // setisAdmin(true);
          //   event.preventDefault();

          //   const authenticated = await authenticate(
          //     "username123",
          //     "password123"
          //   );
          //   if (authenticated) {
          //     setisAdmin(true);
          //     Cookies.set("user", "loginTrue");
          //   } else {
          //     setisAdmin(false);
          //   }
          // }
          // }
        >
          Authenticate
        </Button>
      </form>
      {/* <Button
        onClick={async (event) => {
          // setisAdmin(true);
          event.preventDefault();

          const authenticated = await authenticate(
            "username123",
            "password123"
          );
          if (authenticated) {
            setisAdmin(true);
            Cookies.set("user", "loginTrue");
          } else {
            setisAdmin(false);
          }
        }}
      >
        Authenticate
      </Button> */}
      <Box>
        <Button
          onClick={async () => {
            setisAdmin(false);
            Cookies.remove("user");
          }}
        >
          Logout
        </Button>
      </Box>
    </Layout>
  );
};
