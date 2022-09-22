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
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../context/Appcontext";
const Notes = () => {
  const { getNotes, notes, createNote, deleteNote, updateNote } =
    useContext(Appcontext);
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const [heading, setHeading] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  const [update, setUpdate] = useState({});
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
  };
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
            onCloseCreate();
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
  const UpdateNote = async (id) => {
    await updateNote(update, id).then((res) => {
      if (res && res?.data?.success === true) {
        toast({
          title: "Success",
          description: "Note updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        getNotes();
        onCloseUpdate();
      } else if (res?.response?.data?.success === false) {
        toast({
          title: "Error",
          description: res.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    });
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
    getNotes()
      .then((res) => {
        console.log(res);
        if (res?.success === false) {
          toast({
            title: "Error",
            description: res.message,
            status: "warning",
            duration: 1000,
            isClosable: true,
          });
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box textAlign={"center"}>
      <Box>
        <Heading>My Notes</Heading>
        <Text fontSize="2xl" color="gray.400">
          Create Note
        </Text>
        <AddIcon
          color="green.900"
          boxSize="24px"
          cursor="pointer"
          border="1px solid black"
          padding="5px"
          borderRadius=".5rem"
          onClick={onOpenCreate}
        />
      </Box>
      <Modal
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
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
              <Button onClick={onCloseCreate}>Cancel</Button>
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
                alignItems="center"
                justifyContent="space-between"
                padding=".5rem"
                margin=".5rem"
                border="1px solid black"
              >
                <EditIcon
                  cursor="pointer"
                  color="orange.400"
                  onClick={onOpenUpdate}
                />
                <Modal
                  isOpen={isOpenUpdate}
                  onClose={onCloseUpdate}
                  size="sm"
                  scrollBehavior="inside"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Update Note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>Heading</FormLabel>
                        <Input
                          required
                          placeholder="Heading"
                          defaultValue={note.Heading}
                          name="Heading"
                          onChange={(e) => handleFieldChange(e)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Note</FormLabel>
                        <Input
                          required
                          placeholder="Note"
                          defaultValue={note.Note}
                          name="Note"
                          onChange={(e) => handleFieldChange(e)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Tag</FormLabel>
                        <Input
                          required
                          placeholder="Tag"
                          defaultValue={note.Tag}
                          name="Tag"
                          onChange={(e) => handleFieldChange(e)}
                        />
                      </FormControl>
                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={() => UpdateNote(note._id)}
                        >
                          Update
                        </Button>
                        <Button onClick={onCloseUpdate}>Cancel</Button>
                      </ModalFooter>
                    </ModalBody>
                  </ModalContent>
                </Modal>
                <Box>
                  <Text>{note.Heading}</Text>
                  <Text fontSize="8px">{note.Note}</Text>
                </Box>
                <DeleteIcon
                  cursor="pointer"
                  color="red.400"
                  onClick={() => DeleteNote(note._id)}
                />
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
