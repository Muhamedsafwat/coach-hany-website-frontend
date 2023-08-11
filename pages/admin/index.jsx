import React, { useState, useEffect } from "react";
import {
  Stack,
  Text,
  Heading,
  Box,
  useToast,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";

import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import axios from "axios";

import Loading from "../../components/Loading";
import ProtectedRoute from "../../components/ProtectedRoute";
import PlanFormModal from "../../components/PlanFormModal";

import deletePlan from "../../handlers/deletePlanHandler";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const getPlans = async () => {
    axios
      .get(`${process.env.API_URL}/api/plans`, { withCredentials: true })
      .then((res) => {
        setPlans(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        networkError();
      });
  };

  const networkError = () => {
    toast({
      title: "Network Error",
      description: "please check your internet connection",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const success = () => {
    toast({
      title: "Done!",
      description: "Package deleted successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  useEffect(() => {
    getPlans();
  }, []);

  const refresh = () => {
    getPlans();
  };

  const deleteHandler = (id) => {
    deletePlan(id, refresh, networkError, success);
  };

  //open create plan modal
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Flex justify="center" flexWrap="wrap" gap="2rem">
            {plans.map((item, index) => {
              return (
                <Card
                  refresh={refresh}
                  deleteHandler={deleteHandler}
                  key={index}
                  {...item}
                />
              );
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
                  <Button
                    onClick={onOpen}
                    padding="2rem"
                    size="lg"
                    rounded="full"
                  >
                    <AiOutlinePlus size={30} />
                  </Button>
                  <Text fontSize="1.7rem">Create new plan</Text>
                </Stack>
                <PlanFormModal
                  refresh={refresh}
                  isOpen={isOpen}
                  onClose={onClose}
                  method="post"
                />
              </Stack>
            </Box>
          </Flex>
        )}
      </Box>
    </ProtectedRoute>
  );
};

const Card = ({
  duration,
  price,
  features,
  insteadOf,
  _id,
  deleteHandler,
  refresh,
}) => {
  //open update plan Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
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
            {insteadOf} LE
          </Text>
          <Text mb={5} fontWeight="bold" fontSize="3.2rem" color="brand">
            {price} LE
          </Text>
          {features.map((item, index) => {
            return (
              <Text fontWeight="light" mb={1} key={index}>
                {item}
              </Text>
            );
          })}
          <Flex justify="center" gap="1rem">
            <Button
              onClick={() => deleteHandler(_id)}
              size="sm"
              bg="rgba(250,50,50,0.8)"
            >
              <AiOutlineDelete /> <Text ml={1}>Delete</Text>
            </Button>
            <Button onClick={onOpen} size="sm" bg="brand">
              <AiOutlineEdit /> <Text ml={1}>Edit</Text>
            </Button>
          </Flex>
        </Stack>
      </Box>
      <PlanFormModal
        onClose={onClose}
        isOpen={isOpen}
        method="put"
        duration={duration}
        price={price}
        currentFeatures={features}
        insteadOf={insteadOf}
        _id={_id}
        refresh={refresh}
      />
    </>
  );
};

export default Plans;
