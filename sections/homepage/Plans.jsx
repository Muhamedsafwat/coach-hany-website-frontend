import React from "react";
import { Flex, Box, Text, Stack } from "@chakra-ui/react";

import SectionLayout from "../SectionLayout";

const Plans = () => {
  return (
    <SectionLayout
      heading="our plans"
      subHeading="choose your pricing plan"
      bgColor="#0f0f0f"
    >
      <Flex gap="1rem" justify="space-around" flexWrap="wrap">
        {plans.map((item) => (
          <Card {...item} />
        ))}
      </Flex>
    </SectionLayout>
  );
};

const Card = ({ duration, price, features }) => {
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
        <Text mb={5} fontWeight="bold" fontSize="3.2rem" color="brand">
          {price}
        </Text>
        {features.map((item) => (
          <Text fontWeight="light" mb={1}>
            {item}
          </Text>
        ))}
      </Stack>
    </Box>
  );
};

const plans = [
  {
    duration: "3 Months",
    price: "350 LE",
    features: [
      "Free riding",
      "Unlimited equipments",
      "Personal trainer",
      "Weight losing classes",
      "Month to mouth",
    ],
  },
  {
    duration: "6 Months",
    price: "600 LE",
    features: [
      "Free riding",
      "Unlimited equipments",
      "Personal trainer",
      "Weight losing classes",
      "Month to mouth",
    ],
  },
  {
    duration: "9 Months",
    price: "850 LE",
    features: [
      "Free riding",
      "Unlimited equipments",
      "Personal trainer",
      "Weight losing classes",
      "Month to mouth",
    ],
  },
];

export default Plans;
