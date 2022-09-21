import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  FormControl,
  Input,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";

import { Appcontext } from "../context/Appcontext";
import { Form } from "react-router-dom";
const Notes = () => {
  const { getNotes, notes, createNote, deleteNote, updateNote } =
    useContext(Appcontext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [name, setName] = useState("");
  const [heading, setHeading] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  const AddNewNote = async () => {
    let payload = {
      Heading: heading,
      Note: note,
      Tag: tag,
    };
    if (heading && note && tag) {
      await createNote(payload)
        .then((res) => {
          if (res.data.success === true) {
            toast({
              title: "Success",
              description: "Note added successfully",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            onClose();
            getNotes();
          }
        })
        .catch((err) =>
          toast({
            title: "Error",
            description: "Something went wrong while adding note",
            status: "error",
            duration: 2000,
            isClosable: true,
          })
        );
    } else {
      toast({
        title: "Warning",
        description: "Enter all fields to add note",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const DeleteNote = async (id) => {
    await deleteNote(id)
      .then((res) => {
        if (res.data.success === true) {
          toast({
            title: "Success",
            description: "Note deleted successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          getNotes();
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Error deleting note",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <Box textAlign={"center"}>
      <Box>
        <Heading>My Notes</Heading>
        <Text fontSize="2xl" color="gray.400">
          Create Note
        </Text>
        <AddIcon onClick={onOpen} />
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Heading</FormLabel>
              <Input
                required
                placeholder="Heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Note</FormLabel>
              <Input
                required
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tag</FormLabel>
              <Input
                required
                placeholder="Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </FormControl>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={AddNewNote}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        direction={"column"}
        background="gray.100"
        width="50%"
        margin="1rem auto"
      >
        {notes?.length > 0 ? (
          notes.map((note, index) => {
            return (
              <Flex
                key={index}
                alignItems="space-evenly"
                justifyContent="space-between"
                padding=".5rem"
                margin=".5rem"
              >
                <EditIcon />
                <Box>
                  <Text>{note.Heading}</Text>
                  <Text fontSize="8px">{note.Note}</Text>
                </Box>
                <DeleteIcon onClick={() => DeleteNote(note._id)} />
              </Flex>
            );
          })
        ) : (
          <Box>Notes empty! create one</Box>
        )}
      </Flex>
    </Box>
  );
};

export default Notes;
