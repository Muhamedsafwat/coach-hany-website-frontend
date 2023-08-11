import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Stack,
  Heading,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  IconButton,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";

import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import adminLoginValidator from "../../validators/adminLoginValidator";

import { UserInfo } from "../../authContext";

const Login = () => {
  const router = useRouter();
  //user context
  const { user, login } = useContext(UserInfo);

  //redirect if user logged in
  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, [user, router]);

  //show password
  const [showPass, setShowPass] = useState(false);
  const showClickHandler = () => setShowPass(!showPass);

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(adminLoginValidator) });

  //form submit handler
  const toast = useToast();

  const onSubmit = (data) => {
    setIsLoading(true);
    const api = axios.create({
      withCredentials: true,
    });

    api
      .post(`${process.env.API_URL}/api/admin/auth`, data)
      .then((res) => {
        login(res.data);
        router.push("/admin");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          toast({
            title: "Invalid data",
            description: "Check username and password",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Network error",
            description: "please check your internet connection",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
        setIsLoading(false);
      });
  };

  return (
    <Stack pt="9rem" pb="4rem">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          bg="rgba(120,120,120, 0.1)"
          margin="auto"
          w="90vw"
          maxWidth="450px"
          align="center"
          p="2rem"
        >
          <Heading>Admin Login</Heading>
          <FormControl
            isDisabled={isLoading}
            isInvalid={errors.username}
            marginBlock="1rem"
          >
            <InputGroup>
              <InputLeftElement>
                <AiOutlineUser />
              </InputLeftElement>
              <Input
                {...register("username")}
                focusBorderColor="brand"
                placeholder="User name"
                type="text"
                variant="filled"
              />
            </InputGroup>
            {errors.userName && (
              <FormErrorMessage>Required field</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isDisabled={isLoading} isInvalid={errors.password}>
            <InputGroup>
              <InputLeftElement>
                <AiOutlineLock />
              </InputLeftElement>
              <Input
                {...register("password")}
                focusBorderColor="brand"
                placeholder="Password"
                type={showPass ? "text" : "password"}
                variant="filled"
              />
              <InputRightElement>
                <IconButton
                  onClick={showClickHandler}
                  isRound={true}
                  variant="ghost"
                  size="sm"
                  icon={showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                />
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <FormErrorMessage>Required field</FormErrorMessage>
            )}
          </FormControl>
          <Button
            isLoading={isLoading}
            mt="1rem"
            fontWeight="700"
            bg="brand"
            w="40%"
            type="submit"
          >
            Login
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;
