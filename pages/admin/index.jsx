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

import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import axios from "axios";

import Loading from "../../components/Loading";

import ProtectedRoute from "../../components/ProtectedRoute";

const Users = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const getPlans = async () => {
    axios
      .get("http://localhost:5000/api/plans", { withCredentials: true })
      .then((res) => {
        setPlans(res.data);
        setIsLoading(false);
        console.log(res.data);
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
    getPlans();
  }, []);

  return (
    <ProtectedRoute allowedRole="admin">
      <Box
        flex={1}
        paddingBlock="2rem"
        paddingInline={{ base: "1.5rem", md: "3rem", lg: "6rem" }}
      >
        <Heading mb="2rem">Pricing plans</Heading>
        {isLoading ? (
          <Loading />
        ) : (
          <Flex flexWrap="wrap" gap="2rem">
            {plans.map((item, index) => {
              return <Card key={index} {...item} />;
            })}
            <Box
              marginBlock={["1rem", "1rem", "2rem"]}
              cursor="pointer"
              transition=".3s"
              transform="skewY(-4deg)"
              textAlign="center"
              paddingBlock={10}
              minW="250px"
              w="27%"
              border="1px"
              borderColor="#555"
            >
              <Stack
                h="100%"
                justify="center"
                align="center"
                transform="skewY(4deg)"
              >
                <Stack align="center">
                  <Button padding="2rem" size="lg" rounded="full">
                    <AiOutlinePlus size={30} />
                  </Button>
                  <Text fontSize="1.7rem">Create new plan</Text>
                </Stack>
              </Stack>
            </Box>
          </Flex>
        )}
      </Box>
    </ProtectedRoute>
  );
};

const Card = ({ duration, price, features, insteadOf }) => {
  return (
    <Box
      marginBlock={["1rem", "1rem", "2rem"]}
      cursor="pointer"
      transition=".3s"
      transform="skewY(-4deg)"
      textAlign="center"
      paddingBlock={10}
      minW="250px"
      w="27%"
      border="1px"
      borderColor="#555"
    >
      <Stack transform="skewY(4deg)">
        <Text marginBottom="-.8rem" fontWeight="bold" fontSize="1.8rem">
          {duration}
        </Text>
        <Text
          mb="-1.3rem"
          mt="1rem"
          textDecoration="line-through"
          fontSize="1.5rem"
          color="#888"
        >
          {insteadOf}
        </Text>
        <Text mb={5} fontWeight="bold" fontSize="3.2rem" color="brand">
          {price}
        </Text>
        {features.map((item, index) => {
          return (
            <Text fontWeight="light" mb={1} key={index}>
              {item}
            </Text>
          );
        })}
        <Flex justify="center" gap="1rem">
          <Button size="sm" bg="rgba(250,50,50,0.8)">
            <AiOutlineDelete /> <Text ml={1}>Delete</Text>
          </Button>
          <Button size="sm" bg="brand">
            <AiOutlineEdit /> <Text ml={1}>Edit</Text>
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Users;
