import { useContext, useState } from "react";
import { Appcontext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  useToast,
  Input,
  Button,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { loginUser, loading, error, login, setLogin } = useContext(Appcontext);
  const handleLogin = async () => {
    const payload = {
      email,
      password,
    };
    if (email && password) {
      await loginUser(payload);
      if (login.success === true && loading === false) {
        toast({
          title: "Success",
          description: login.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        localStorage.setItem("user_auth_token", JSON.stringify(login.token));
        setLogin("");
        navigate("/notes");
      } else if (login.success === false && loading === false) {
        toast({
          title: "Error",
          description: login.message + " " + login.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLogin("");
      }
    } else {
      alert("Please enter a valid credentials!");
    }
  };
  return (
    <Flex
      direction="column"
      textAlign="center"
      justifyContent="space-evenly"
      w="100vw"
      alignItems="center"
      h="100vh"
    >
      <Flex
        direction="column"
        border="1px solid lightgray"
        padding="1rem"
        borderRadius="1rem"
      >
        <Heading m=".5rem">Login</Heading>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <Input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button
          variant="solid"
          colorScheme="linkedin"
          color="white"
          width="100%"
          onClick={handleLogin}
        >
          Login
        </Button>
        <Box>
          <Text>
            New User, Please{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>
              {" "}
              <Link to="/signup">SignUp</Link>
            </span>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
