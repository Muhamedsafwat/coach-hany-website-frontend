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

import { AiOutlinePlus } from "react-icons/ai";

import axios from "axios";

import { UserInfo } from "../authContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Loading from "../components/Loading";
import UpdateProfileMoadal from "../components/UpdateProfileMoadal";

import logoutHandler from "../handlers/logoutHandler";

const Profile = () => {
  const toast = useToast();
  //states
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  //get user context
  const { user, logout } = useContext(UserInfo);

  //fetch user data function
  const getData = () => {
    axios
      .get(`${process.env.API_URL}/api/users/${user._id}`, {
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

  //open update profile Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //get data
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  return (
    <ProtectedRoute allowedRole="user">
      <Stack
        align="center"
        paddingInline={{ base: "1.5rem", md: "3rem", lg: "6rem" }}
        pt="7rem"
        pb="5rem"
      >
        <Heading>Your Progress</Heading>
        <Flex gap="1rem" fontSize="xl">
          <Text>#{user.code} :</Text>
          <Text>{user.name}</Text>
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
                <Tr>
                  <Th colSpan={8}>
                    <Stack w="100%" align="center">
                      <Button onClick={onOpen} rounded="full">
                        <AiOutlinePlus size={25} />
                      </Button>
                      <UpdateProfileMoadal
                        isOpen={isOpen}
                        onClose={onClose}
                        measurements={data.measurements}
                        _id={user._id}
                        refresh={getData}
                      />
                      <Text>Update your progress</Text>
                    </Stack>
                  </Th>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        )}
        <Button
          mt="1rem"
          bg="rgba(200,50,50,0.6)"
          onClick={() => logoutHandler(logout, router)}
          isLoading={isLoading}
        >
          Logout
        </Button>
      </Stack>
    </ProtectedRoute>
  );
};

const TableItem = ({ weight, neck, chest, arm, waist, hip, thigh, date }) => {
  return (
    <Tr>
      <Td>{date}</Td>
      <Td>{weight} kg</Td>
      <Td>{neck} cm</Td>
      <Td>{chest} cm</Td>
      <Td>{arm} cm</Td>
      <Td>{waist} cm</Td>
      <Td>{hip} cm</Td>
      <Td>{thigh} cm</Td>
    </Tr>
  );
};

export default Profile;
