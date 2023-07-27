import React, { useState } from "react";
import Link from "next/link";
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
} from "@chakra-ui/react";

import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import loginFormValidator from "../validators/loginFormValidator";
import loginHandler from "../handlers/loginHandler";

const Login = () => {
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
  const onSubmit = (data) => {
    loginHandler(data);
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
          <Heading>Login</Heading>
          <FormControl isInvalid={errors.code} marginBlock="1rem">
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
            {errors.code && <FormErrorMessage>Required field</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={errors.password}>
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
          <Text fontSize="sm" w="100%">
            Not a member yet?{" "}
            <Text color="brand" as="span">
              <Link href="/register">Join us</Link>
            </Text>
          </Text>
          <Button mt="1rem" fontWeight="700" bg="brand" w="40%" type="submit">
            Login
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;
