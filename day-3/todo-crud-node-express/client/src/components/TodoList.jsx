import React from "react";
import {Flex,Text} from "@chakra-ui/react"
import { CheckIcon,DeleteIcon } from "@chakra-ui/icons";
const TodoList = ({todos,handleUpdate,handleDelete}) => {
  return (
    <>
      {todos.map((item) => (
        <Flex
          key={item.id}
          justify="space-between"
          alignItems="center"
          m=".5rem"
          padding=".5rem"
          boxShadow="md"
          backgroundColor={item.status ? "green.100" : ""}
          color={item.status ? "gray.300" : ""}
        >
          <CheckIcon
            cursor={"pointer"}
            color={item.status ? "green" : "orange"}
            onClick={() => handleUpdate(item.id, item)}
          />
          <Text width="80%" m="auto">
            {item.title}
          </Text>
          <DeleteIcon
            onClick={() => handleDelete(item.id)}
            cursor={"pointer"}
            color="red.600"
          />
        </Flex>
      ))}
    </>
  );
};

export default TodoList;
