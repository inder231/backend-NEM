import React from "react";
import {
  Flex,
  Box,
  Input,
  Button,
  useToast,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
} from "@chakra-ui/react";
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
import TodoList from "./TodoList";
const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.appReducer.todos);
  const loading = useSelector((store) => store.appReducer.isLoading);
  const error = useSelector((store) => store.appReducer.isError);
  const [title, setTitle] = useState("");
  const done = todos.filter((item) => item.status);
  const undone = todos.filter((item) => !item.status);
  const handleAddTodo = (e) => {
    const payload = {
      title,
      status: false,
    };
    if (e.keyCode === 13) {
      dispatch(addTodo(payload)).then(
        (r) => r.type === "ADD_TODO_SUCCESS" && dispatch(getTodos())
      );
      setTitle("");
    }
  };
  const handleUpdate = (id, item) => {
    dispatch(updateTodo(id, { status: !item.status })).then((r) => {
      if (r.type === "UPDATE_TODO_SUCCESS") {
        dispatch(getTodos());
      }
    });
  };
  const handleDelete = (id) => {
    dispatch(deleteTodo(id)).then((r) => {
      if (r.type === "DELETE_TODO_SUCCESS") {
        dispatch(getTodos());
      }
    });
  };
  useEffect(() => {
    dispatch(getTodos());
  }, []);
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
          {error ? (
            <Flex justify={"center"} alignItems="center">
              <Alert status="error">
                <AlertIcon />
                Something went wrong!
              </Alert>
            </Flex>
          ) : loading ? (
            <Flex justify={"center"} alignItems="center">
              <Spinner />{" "}
            </Flex>
          ) : (
            <Box>
              {todos?.length === 0 ? (
                <Box>
                  <Heading size="md" color="gray.300">
                    add something .. lazy person
                  </Heading>
                </Box>
              ) : (
                <Box>
                  <Heading size="sm" color="gray.300" fontStyle="italic" >To-Do</Heading>
                  <TodoList
                  todos={undone}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
                <hr style={{margin:"1rem",height:"2px",backgroundColor:"gray"}} />
                  <Heading size="sm" color="gray.300" fontStyle="italic" >Done</Heading>
                  <TodoList
                  todos={done}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
                </Box>
              )}
            </Box>
          )}
        </Box>

        <Box></Box>
      </Flex>
    </>
  );
};

export default Todo;
