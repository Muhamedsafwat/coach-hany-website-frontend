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
import axios from "axios";
import Link from "next/link";

import Loading from "../../../components/Loading";

import ProtectedRoute from "../../../components/ProtectedRoute";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const getApplications = async () => {
      axios
        .get(`${process.env.API_URL}/api/applications`, {
          withCredentials: true,
        })
        .then((res) => {
          setApplications(res.data);
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
    getApplications();
  }, []);

  return (
    <ProtectedRoute allowedRole="admin">
      <Box
        flex={1}
        paddingInline={{ base: "1.5rem", md: "3rem", lg: "6rem" }}
        paddingBlock="2rem"
      >
        <Heading mb="2rem">Applications</Heading>
        {isLoading ? (
          <Loading />
        ) : (
          <Stack spacing="1rem">
            {applications.map((item, index) => {
              return <ListItem key={index} {...item} />;
            })}
          </Stack>
        )}
      </Box>
    </ProtectedRoute>
  );
};

const ListItem = ({ code, name, duration, target }) => {
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
      align="center"
      spacing="1rem"
      fontSize={["sm", "md"]}
    >
      <Text>{name}</Text>

      <Flex
        gap={["1rem", null, "2rem"]}
        justify="flex-end"
        width={["40%", null, "50%"]}
        align="center"
      >
        <Text display={["none", "none", "inline"]}>#{code}</Text>
        <Text display={["none", "none", "inline"]}>{duration + " "}months</Text>
        <Text>{target}</Text>
        <Link href={`/admin/applications/${code}`}>
          <Button size="sm" bg="brand">
            View
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Applications;
