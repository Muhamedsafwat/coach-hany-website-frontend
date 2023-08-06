import React, { useState, useEffect } from "react";
import {
  Stack,
  Text,
  Heading,
  Box,
  useToast,
  Button,
  Flex,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";

import Loading from "../../../components/Loading";

import ProtectedRoute from "../../../components/ProtectedRoute";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const getUsers = async () => {
    axios
      .get("http://localhost:5000/api/users", { withCredentials: true })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Network Error",
          description: "please check your internet connection",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <ProtectedRoute allowedRole="admin">
      <Box
        flex={1}
        paddingBlock="2rem"
        paddingInline={{ base: "1.5rem", md: "3rem", lg: "6rem" }}
      >
        <Heading mb="2rem">Clients</Heading>
        {isLoading ? (
          <Loading />
        ) : (
          <Stack spacing="1rem">
            {users.map((item, index) => {
              return <ListItem key={index} {...item} />;
            })}
          </Stack>
        )}
      </Box>
    </ProtectedRoute>
  );
};

const ListItem = ({ code, name, _id }) => {
  return (
    <Flex
      cursor="pointer"
      transition=".3s"
      _hover={{ bg: "#292929" }}
      fontWeight="bold"
      bg="#222"
      padding="1rem"
      paddingInline="2rem"
      borderRadius={10}
      justify="space-between"
      align="center"
      spacing="1rem"
    >
      <Text>{name}</Text>

      <Flex justify="space-between" width="40%" align="center">
        <Text>#{code}</Text>
        <Text>Gain</Text>
        <Flex gap="1rem">
          <Link href={`/admin/users/${_id}`}>
            <Button size="sm" bg="brand">
              View progress
            </Button>
          </Link>
          <Link href={`/admin/applications/${code}`}>
            <Button size="sm" bg="brand">
              View form
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Users;
