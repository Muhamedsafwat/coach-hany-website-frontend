import React, { useState, useContext, useEffect } from "react";
import {
  Stack,
  Box,
  Text,
  Heading,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import axios from "axios";

import ProtectedRoute from "../../../components/ProtectedRoute";
import Loading from "../../../components/Loading";

const UserDeatials = () => {
  const toast = useToast();
  //states
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  //fetch user data function
  const router = useRouter();

  const getData = () => {
    const id = router.query._id;
    axios
      .get(`http://localhost:5000/api/users/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast({
          status: "error",
          title: "Connection error",
          description: "Please check your internet connection",
          isClosable: true,
          duration: 5000,
        });
      });
  };

  //get data
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 3000);
  }, []);

  return (
    <ProtectedRoute allowedRole="admin">
      <Stack
        align="center"
        paddingInline={{ base: "1.5rem", md: "3rem", lg: "6rem" }}
        pt="5rem"
        pb="5rem"
      >
        <Heading>Client Progress</Heading>
        <Flex gap="1rem" fontSize="xl">
          <Text>{data.code}# :</Text>
          <Text>{data.name}</Text>
        </Flex>
        {isLoading ? (
          <Loading />
        ) : (
          <TableContainer
            border="1px"
            borderColor="#333"
            borderRadius={10}
            mt="2rem"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Weight</Th>
                  <Th>Neck</Th>
                  <Th>Chest</Th>
                  <Th>Arm</Th>
                  <Th>Hip</Th>
                  <Th>Waist</Th>
                  <Th>Thigh</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.measurements.map((item, index) => {
                  return <TableItem key={index} {...item} />;
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        <Button mt="1rem" bg="rgba(200,50,50,0.6)" isLoading={isLoading}>
          Delete account
        </Button>
      </Stack>
    </ProtectedRoute>
  );
};

const TableItem = ({ weight, neck, chest, arm, waist, hip, thigh, date }) => {
  return (
    <Tr>
      <Td>{date}</Td>
      <Td>{weight} cm</Td>
      <Td>{neck} cm</Td>
      <Td>{chest} cm</Td>
      <Td>{arm} cm</Td>
      <Td>{waist} cm</Td>
      <Td>{hip} cm</Td>
      <Td>{thigh} cm</Td>
    </Tr>
  );
};

export default UserDeatials;
