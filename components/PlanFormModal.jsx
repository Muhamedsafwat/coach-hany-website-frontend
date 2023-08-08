import React, { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Stack,
  useToast,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import { AiOutlineClose } from "react-icons/ai";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pricingPlanValidator from "../validators/pricingPlanValidator";
import { createPlan } from "../handlers/createPlanHandler";

const PlanFormModal = ({ isOpen, onClose, refresh }) => {
  const method = "post";
  //loading state
  const [isLoading, setIsLoading] = useState(false);
  //features array
  const [features, setFeatures] = useState([]);
  const inputRef = useRef();

  const addFeature = () => {
    if (inputRef.current.value) {
      setFeatures([...features, inputRef.current.value]);
      inputRef.current.value = "";
    }
  };

  const removeFeature = (index) => {
    const beforeIndex = features.slice(0, index);
    const afterIndex = features.slice(index + 1);
    const newArr = beforeIndex.concat(afterIndex);
    setFeatures(newArr);
  };
  //form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(pricingPlanValidator),
  });
  //feedback
  const toast = useToast();

  const success = () => {
    toast({
      title: method == "post" ? "Created succesfully" : "Updated succesfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const error = () => {
    toast({
      title: "Network error",
      description: "please check your internet connection",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  //submit form
  const submit = (data) => {
    createPlan(data, features, setIsLoading, onClose, success, error, refresh);
  };
  return (
    <Modal scrollBehavior={"inside"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#191919">
        <ModalHeader>Create a package</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#555",
              borderRadius: "24px",
            },
          }}
        >
          <form onSubmit={handleSubmit(submit)}>
            <Stack spacing={5}>
              <Input
                isInvalid={errors.duration}
                placeholder="Duration"
                type="text"
                {...register("duration")}
              />
              <InputGroup>
                <Input
                  isInvalid={errors.price}
                  placeholder="Price"
                  type="text"
                  {...register("price")}
                />
                <InputRightAddon children=" LE" />
              </InputGroup>
              <InputGroup>
                <Input
                  isInvalid={errors.insteadOf}
                  placeholder="Instead of"
                  type="text"
                  {...register("insteadOf")}
                />
                <InputRightAddon children=" LE" />
              </InputGroup>
              <Stack>
                <InputGroup>
                  <Input
                    ref={inputRef}
                    placeholder="Add features"
                    type="text"
                  />
                  <InputRightElement width="3rem">
                    <Button onClick={addFeature} borderRadius={0} w="100%">
                      <Text fontSize=".8rem">Add</Text>
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {features.map((item, index) => (
                  <Stack
                    justify="space-between"
                    align="center"
                    direction="row"
                    key={index}
                    padding={1}
                    pl={3}
                    borderRadius={8}
                    bg="#222 "
                  >
                    <Text>- {item}</Text>
                    <Button
                      onClick={() => removeFeature(index)}
                      rounded="full"
                      colorScheme="red"
                      variant="ghost"
                      size="sm"
                    >
                      <AiOutlineClose color="red" />
                    </Button>
                  </Stack>
                ))}
              </Stack>
              <Stack mb="1rem">
                <Button type="submit" bg="brand" m="auto" size="sm">
                  Submit
                </Button>
              </Stack>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlanFormModal;
