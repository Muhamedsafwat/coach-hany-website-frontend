import React, { useState, useEffect } from "react";
import { Flex, Box, Text, Stack } from "@chakra-ui/react";

import axios from "axios";

import SectionLayout from "../SectionLayout";
import Loading from "../../components/Loading";

const Plans = () => {
  const [plans, setPlans] = useState();

  const getPlans = () => {
    axios.get("http://localhost:5000/api/plans").then((res) => {
      setPlans(res.data);
    });
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <SectionLayout
      heading="our offers"
      subHeading="choose your suitable package"
      bgColor="#0f0f0f"
    >
      {plans ? (
        <Flex gap="2rem" justify="center" flexWrap="wrap">
          {plans.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </Flex>
      ) : (
        <Loading />
      )}
    </SectionLayout>
  );
};

const Card = ({ duration, price, features, insteadOf }) => {
  return (
    <Box
      marginBlock={["1rem", "1rem", "2rem"]}
      cursor="pointer"
      transition=".3s"
      _hover={{ transform: "translateY(-5px) skewY(-4deg)", bg: "#222" }}
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
        {features.map((item, index) => (
          <Text key={index} fontWeight="light" mb={1}>
            {item}
          </Text>
        ))}
      </Stack>
    </Box>
  );
};

const plansTest = [
  {
    duration: "1 Month",
    insteadOf: "750 LE",
    price: "500 LE",
    features: [
      "Personalized diet plan",
      "Professional workout plan",
      "Get additional 15 days for free",
      "Limited discount",
    ],
  },
  {
    duration: "2 Months",
    insteadOf: "1500 LE",
    price: "1000 LE",
    features: [
      "Personalized diet plan",
      "Professional workout plan",
      "Get additional 1 month for free",
      "Limited discount",
    ],
  },
  {
    duration: "4 Months",
    insteadOf: "3000 LE",
    price: "2000 LE",
    features: [
      "Personalized diet plan",
      "Professional workout plan",
      "Get additional 2 months for free",
      "Limited discount",
    ],
  },
];

export default Plans;
