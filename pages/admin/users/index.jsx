import React, { useState, useEffect } from "react";
import {
  Stack,
  Text,
  Heading,
  Box,
  useToast,
  Button,
  Flex,
} from "@chakra-ui/react";
import { AiOutlineBarChart, AiOutlineForm } from "react-icons/ai";

import axios from "axios";
import Link from "next/link";

import Loading from "../../../components/Loading";

import ProtectedRoute from "../../../components/ProtectedRoute";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const getUsers = async () => {
      axios
        .get(`${process.env.API_URL}/api/users`, { withCredentials: true })
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

const ListItem = ({ code, name, _id, target }) => {
  return (
    <Flex
      cursor="pointer"
      transition=".3s"
      _hover={{ bg: "#292929" }}
      fontWeight="bold"
      bg="#222"
      padding="1rem"
      paddingInline={["1rem", "2rem"]}
      borderRadius={10}
      justify="space-between"
      gap="1rem"
      fontSize={["sm", "md"]}
      direction={["column", null, "row"]}
      align={["flex-start", null, "center"]}
    >
      <Text>{name}</Text>

      <Flex
        justify={["space-between", "flex-end"]}
        width={["100%", null, "50%"]}
        align="center"
        gap="1rem"
      >
        <Flex align="center" gap="1rem">
          <Text>#{code}</Text>
          <Text display={["none", null, "inline"]}>{target}</Text>
        </Flex>
        <Flex gap="1rem">
          <Link href={`/admin/users/${_id}`}>
            <Button size="sm" bg="brand">
              <AiOutlineBarChart />
              <Text ml={1}>View progress</Text>
            </Button>
          </Link>
          <Link href={`/admin/applications/${code}`}>
            <Button size="sm" bg="brand">
              <AiOutlineForm />
              <Text ml={1}>View form</Text>
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Users;
