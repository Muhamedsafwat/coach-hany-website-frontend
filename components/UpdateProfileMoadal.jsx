import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  SimpleGrid,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import updateProfileValidator from "../validators/updateProfileValidator";
import updateProfileHandler from "../handlers/updateProfileHandler";

const UpdateProfileMoadal = ({
  isOpen,
  onClose,
  measurements,
  _id,
  refresh,
}) => {
  //loading state
  const [isLoading, setIsLoading] = useState(false);
  //form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProfileValidator),
  });
  //feedback
  const toast = useToast();

  const success = () => {
    toast({
      title: "Updated succesfully",
      description: "Thank you for updating your progress",
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
  const updateProfile = (data) => {
    updateProfileHandler(
      measurements,
      data,
      setIsLoading,
      onClose,
      success,
      error,
      _id,
      refresh
    );
  };

  return (
    <Modal scrollBehavior={"inside"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#191919">
        <ModalHeader>Update progress</ModalHeader>
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
          <Box mb="2rem" h="300px">
            <img
              style={{ height: "100%", margin: "auto" }}
              src="/body.jpg"
              alt="body"
            />
          </Box>
          <form onSubmit={handleSubmit(updateProfile)}>
            <Input
              mb={5}
              step="0.01"
              isInvalid={errors.weight}
              placeholder="Weight"
              variant="flushed"
              type="number"
              {...register("weight")}
            />
            <SimpleGrid columns={2} columnGap={12} rowGap={5}>
              <Input
                step="0.01"
                isInvalid={errors.neck}
                placeholder="neck"
                variant="flushed"
                type="number"
                {...register("neck")}
              />
              <Input
                step="0.01"
                isInvalid={errors.chest}
                placeholder="chest"
                variant="flushed"
                type="number"
                {...register("chest")}
              />
              <Input
                step="0.01"
                isInvalid={errors.arm}
                placeholder="arm"
                variant="flushed"
                type="number"
                {...register("arm")}
              />
              <Input
                step="0.01"
                isInvalid={errors.waist}
                placeholder="waist"
                variant="flushed"
                type="number"
                {...register("waist")}
              />
              <Input
                step="0.01"
                isInvalid={errors.hip}
                placeholder="hip"
                variant="flushed"
                type="number"
                {...register("hip")}
              />
              <Input
                step="0.01"
                isInvalid={errors.thigh}
                placeholder="thigh"
                variant="flushed"
                type="number"
                {...register("thigh")}
              />
            </SimpleGrid>
            <Stack mt="2rem">
              <Button type="submit" bg="brand" m="auto" size="sm">
                Submit
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProfileMoadal;
