import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  SimpleGrid,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineUserAdd } from "react-icons/ai";

import axios from "axios";

import Loading from "../../../components/Loading";

import ProtectedRoute from "../../../components/ProtectedRoute";

const ApplicationDetails = () => {
  const toast = useToast();
  //form data
  const [data, setData] = useState({});
  //loading state
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [createAccountLoading, setCreateAccountLoading] = useState(false);

  //fetch form data
  const router = useRouter();
  const code = router.query.code;

  const getData = (code) => {
    axios
      .get(`${process.env.API_URL}/api/applications/${code}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast({
          status: "error",
          title: "Connection error",
          description: "Please check your internet connection",
          isClosable: true,
          duration: 5000,
        });
      });
  };

  //delete form funcion
  const deleteHandler = () => {
    setDeleteLoading(true);
    axios
      .delete(`${process.env.API_URL}/api/applications/${code}`, {
        withCredentials: true,
      })
      .then((res) => {
        router.push("/admin/applications");
      })
      .catch((err) => {
        toast({
          status: "error",
          title: "Connection error",
          description: "Please check your internet connection",
          isClosable: true,
          duration: 5000,
        });
      });
  };

  //create account function
  const createAccount = () => {
    setCreateAccountLoading(true);

    axios
      .post(
        `${process.env.API_URL}/api/users`,
        {
          code: data.code,
          password: data.password,
          name: data.name,
          measurements: [{ ...data.measurements }],
          target: data.target,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast({
          status: "success",
          title: "Done",
          description: "User created succesfully",
          isClosable: true,
          duration: 5000,
        });
        setCreateAccountLoading(false);
      })
      .catch((err) => {
        toast({
          status: "error",
          title:
            err.response.status == 400
              ? "User already exists"
              : "Network error",
          description:
            err.response.status == 400
              ? null
              : "Please check your internet connection",
          isClosable: true,
          duration: 5000,
        });
        setCreateAccountLoading(false);
      });
  };

  //fetch data
  useEffect(() => {
    if (code) {
      getData(code);
    }
  }, [code]);

  //render page
  return (
    <ProtectedRoute allowedRole="admin">
      <Stack pt="5rem" pb="4rem">
        <Box
          zIndex={-1}
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          boxSizing="border-box"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          bg="url('/hero-2.jpg')"
        />
        {isLoading ? (
          <Loading />
        ) : (
          <Stack margin="auto" w="90vw" maxWidth="700px" align="center">
            <Heading zIndex={2} size="lg">
              Application details : #{code}
            </Heading>
            <StyledFormControl label="الاسم ثلاثي">
              <Input readOnly value={data.name} variant="flushed" type="text" />
            </StyledFormControl>
            <StyledFormControl label="رقم الموبايل / واتساب">
              <Input readOnly value={data.phone} variant="flushed" type="tel" />
            </StyledFormControl>
            <StyledFormControl label="الكود">
              <Input
                readOnly
                value={data.code}
                variant="flushed"
                type="number"
              />
            </StyledFormControl>
            <StyledFormControl label="الطول">
              <Input
                readOnly
                value={data.height}
                variant="flushed"
                type="number"
              />
            </StyledFormControl>
            <StyledFormControl label="الوزن الحالي">
              <Input
                readOnly
                value={data.measurements.weight}
                variant="flushed"
                type="number"
              />
            </StyledFormControl>
            <StyledFormControl label="العمر">
              <Input
                readOnly
                value={data.age}
                variant="flushed"
                type="number"
              />
            </StyledFormControl>
            <StyledFormControl label="للهدف من الدايت">
              <Input
                readOnly
                value={data.target}
                variant="flushed"
                type="text"
              />
            </StyledFormControl>
            <Stack w="100%" align="flex-start">
              <StyledFormControl label={"مقاسات الجسم كما موضح بالصورة"}>
                <Box mb="2rem" h="300px">
                  <img
                    style={{ height: "100%", margin: "auto" }}
                    src="/body.jpg"
                    alt="body"
                  />
                </Box>
                <SimpleGrid columns={2} columnGap={12} rowGap={5}>
                  <Input
                    readOnly
                    value={`Neck: ${data.measurements.neck}`}
                    placeholder="neck"
                    variant="flushed"
                    type="text"
                  />
                  <Input
                    readOnly
                    value={`Chest: ${data.measurements.chest}`}
                    placeholder="chest"
                    variant="flushed"
                    type="text"
                  />
                  <Input
                    readOnly
                    value={`Arm: ${data.measurements.arm}`}
                    placeholder="arm"
                    variant="flushed"
                    type="text"
                  />
                  <Input
                    readOnly
                    value={`Waist: ${data.measurements.waist}`}
                    placeholder="waist"
                    variant="flushed"
                    type="text"
                  />
                  <Input
                    readOnly
                    value={`Hip: ${data.measurements.hip}`}
                    placeholder="hip"
                    variant="flushed"
                    type="text"
                  />
                  <Input
                    readOnly
                    value={`Thigh: ${data.measurements.thigh}`}
                    placeholder="thigh"
                    variant="flushed"
                    type="text"
                  />
                </SimpleGrid>
              </StyledFormControl>
            </Stack>
            <Stack w="100%" align="flex-start">
              <StyledFormControl label={"صورة حديثة للجسم"}>
                <Box mb="2rem" h="300px">
                  <img
                    style={{ height: "100%", margin: "auto" }}
                    src={data.photo}
                    alt="body"
                  />
                </Box>
              </StyledFormControl>
            </Stack>
            <StyledFormControl label="معدل النشاط">
              <Input
                readOnly
                value={data.activityRate}
                variant="flushed"
                type="text"
              />
            </StyledFormControl>
            <StyledFormControl label={"اكلات حابب متكونش موجودة في الدايت"}>
              <Input
                readOnly
                value={data.preferredFood}
                variant="flushed"
                type="text"
              />
            </StyledFormControl>
            <StyledFormControl label={"اكلات حابب تكون موجودة الدايت"}>
              <Input
                readOnly
                value={data.unpreferredFood}
                variant="flushed"
                type="text"
              />
            </StyledFormControl>
            <StyledFormControl label={"مدة الاشتراك"}>
              <Input
                readOnly
                value={data.duration}
                variant="flushed"
                type="text"
              />
            </StyledFormControl>
            <Stack w="100%" align="flex-start">
              <StyledFormControl label={"تحاليل خلال اخر 3 شهور"}>
                {data.analysis ? (
                  <Box mb="2rem" h="300px">
                    <img
                      style={{ height: "100%", margin: "auto" }}
                      src={data.analysis}
                      alt="body"
                    />
                  </Box>
                ) : (
                  <Text>Not provided</Text>
                )}
              </StyledFormControl>
            </Stack>
            <StyledFormControl label={"طريقة حساب الاكل"}>
              <Input
                readOnly
                value={data.weightMethod}
                variant="flushed"
                type="text"
              />
            </StyledFormControl>
            <StyledFormControl label={"ملاحظات"}>
              <Input
                readOnly
                value={data.notes}
                variant="flushed"
                type="text"
              />
            </StyledFormControl>
            <Flex mt="1rem" gap="1rem">
              <Button
                isLoading={deleteLoading}
                onClick={deleteHandler}
                bg="rgba(200, 20, 20, 1)"
              >
                <AiOutlineDelete />
                <Text ml={1}>Delete</Text>
              </Button>
              <Button
                onClick={createAccount}
                isLoading={createAccountLoading}
                bg="brand"
              >
                <AiOutlineUserAdd />
                <Text ml={1}>Create account</Text>
              </Button>
            </Flex>
          </Stack>
        )}
      </Stack>
    </ProtectedRoute>
  );
};

const StyledFormControl = ({ children, label, error }) => {
  return (
    <FormControl
      isInvalid={error}
      overflow="hidden"
      borderRadius={5}
      bg="rgba(0,0,0,0.7)"
      mt="2rem"
    >
      <FormLabel
        w="100%"
        paddingInline="2rem"
        paddingBlock="1rem"
        bg="rgba(255, 97, 50, 0.4)"
      >
        {label}
      </FormLabel>
      <Box pb="1rem" paddingInline="2rem">
        {children}
      </Box>
    </FormControl>
  );
};

export default ApplicationDetails;
