import React, { useContext, useState, useRef } from "react";
import {
    Box,
    Heading,
    Button,
    Alert,
    AlertIcon,
    Text,
    AlertTitle,
    AlertDescription,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { UserContext } from "../UserContext";
import { authenticate } from "../utils/auth";
import Cookies from "js-cookie";

export const SecretLogin = () => {
    const { isAdmin, setisAdmin } = useContext(UserContext);
    const [status, setStatus] = useState<any>("");
    const usernameRef: any = useRef();
    const passwordRef: any = useRef();
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        const authenticated = await authenticate(username, password);

        if (authenticated) {
            setisAdmin(true);
            setStatus("success");
            Cookies.set("user", "loginTrue");
        } else {
            setStatus("error");
            setisAdmin(false);
        }
    };

    return (
        <Layout title="Login">
            {status == "" ? (
                <Box></Box>
            ) : (
                <Alert status={status}>
                    <AlertIcon />
                    {status == "error" ? (
                        <Text>Username or Password is Incorrect</Text>
                    ) : (
                        <Text>Success</Text>
                    )}
                </Alert>
            )}

            <Box>
                <form onSubmit={handleSubmit}>
                    <FormLabel>
                        Username:
                        <input type="text" name="username" ref={usernameRef} />
                    </FormLabel>
                    <FormLabel>
                        Password:
                        <input type="text" name="password" ref={passwordRef} />
                    </FormLabel>
                    <Button type="submit">Authenticate</Button>
                </form>
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
            </Box>
        </Layout>
    );
};
