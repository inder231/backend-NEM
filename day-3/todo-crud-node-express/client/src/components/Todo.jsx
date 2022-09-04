import React from "react";
import { Flex, Box, Input, Button, useToast, Text } from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../redux/AppReducer/action";
import { useState } from "react";
const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.appReducer.todos);
  const loading = useSelector((store) => store.appReducer.isLoading);
  const error = useSelector((store) => store.appReducer.isError);
  const [title, setTitle] = useState("");
  const handleAddTodo = (e) => {
    const payload = {
      title,
      status: false,
    };
    if (e.keyCode === 13) {
      dispatch(addTodo(payload));
      setTitle("");
    }
  };
  useEffect(() => {
    dispatch(getTodos());
  });
  return (
    <>
      <Flex
        direction="column"
        maxWidth="400px"
        margin="2rem auto"
        boxShadow="lg"
        padding="1rem"
      >
        <Flex>
          <Input
            type="text"
            placeholder="Enter something.........."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyUp={handleAddTodo}
          />
        </Flex>
          <Box width="80%" margin="1rem auto">
            {todos?.length > 0 &&
              todos.map((item) => (
                <Flex
                  key={item.id}
                  justify="space-between"
                  alignItems="center"
                  m=".5rem"
                  padding=".5rem"
                  boxShadow="md"
                >
                  <CheckIcon
                    cursor={"pointer"}
                    color={item.status ? "green" : "orange"}
                    onClick={() =>
                      dispatch(
                        updateTodo(item.id, { status: !item.status })
                      ).then((r) => dispatch(getTodos()))
                    }
                  />
                  <Text width="80%" m="auto">
                    {item.title}
                  </Text>
                  <DeleteIcon
                    onClick={() =>
                      dispatch(deleteTodo(item.id)).then((r) =>
                        dispatch(getTodos())
                      )
                    }
                    cursor={"pointer"}
                    color="red.600"
                  />
                </Flex>
              ))}
          </Box>
        
        <Box></Box>
      </Flex>
    </>
  );
};

export default Todo;
