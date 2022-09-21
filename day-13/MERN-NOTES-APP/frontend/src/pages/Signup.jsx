import { useContext } from "react";
import { useState } from "react";
import { Appcontext } from "../context/Appcontext";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  useToast,
  Input,
  Button,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { signupUser, loading, error, signup,setSignup } = useContext(Appcontext);
  const handleSubmit = async () => {
    const payload = {
      email,
      password,
      age,
    };
    if (email && password && age) {
      await signupUser(payload);
      if (signup.success === true&&loading===false) {
        toast({
          title: "Success",
          description: signup.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setSignup("");
        navigate("/login");
      } else if (signup.success === false&&loading===false) {
        toast({
          title: "Error",
          description: signup.message + " " + signup.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setSignup("");
      }
      setEmail("");
      setPassword("");
      setAge("");
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
        <Heading>Register User</Heading>

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
        <Input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <br />
        <Button colorScheme="linkedin" color="white" onClick={handleSubmit}>
          Register
        </Button>
        <Box>
          <Text>
            Already have an account?{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>
              {" "}
              <Link to="/login">Login</Link>
            </span>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Signup;
