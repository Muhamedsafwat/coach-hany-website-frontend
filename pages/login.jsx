import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Stack,
  Heading,
  Text,
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

import loginFormValidator from "../validators/loginFormValidator";

import { UserInfo } from "../authContext";

import Loading from "../components/Loading";

const Login = () => {
  //user context
  const { user, login } = useContext(UserInfo);

  //redirect if user logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

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
  } = useForm({ resolver: yupResolver(loginFormValidator) });

  //form submit handler
  const toast = useToast();
  const router = useRouter();

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post("http://localhost:5000/api/users/auth", data, {
        withCredentials: true,
      })
      .then((res) => {
        login(res.data);
      })
      .then((res) => {
        router.push("/");
      })
      .catch((err) => {
        toast({
          title:
            err.response.status == 401
              ? "Incorrect code or password"
              : "Network error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
      });
  };

  return (
    <Stack pt="9rem" pb="4rem">
      {!user ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            bg="rgba(120,120,120, 0.1)"
            margin="auto"
            w="90vw"
            maxWidth="450px"
            align="center"
            p="2rem"
          >
            <Heading>Login</Heading>
            <FormControl
              isDisabled={isLoading}
              isInvalid={errors.code}
              marginBlock="1rem"
            >
              <InputGroup>
                <InputLeftElement>
                  <AiOutlineUser />
                </InputLeftElement>
                <Input
                  {...register("code")}
                  focusBorderColor="brand"
                  placeholder="Code"
                  type="number"
                  variant="filled"
                />
              </InputGroup>
              {errors.code && (
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
                    icon={
                      showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
                    }
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormErrorMessage>Required field</FormErrorMessage>
              )}
            </FormControl>
            <Text fontSize="sm" w="100%">
              Not a member yet?{" "}
              <Text color="brand" as="span">
                <Link href="/register">Join us</Link>
              </Text>
            </Text>
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
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default Login;
