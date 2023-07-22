import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

import SectionLayout from "../SectionLayout";

const Plans = () => {
  return (
    <SectionLayout
      heading="our plans"
      subHeading="choose your pricing plan"
      bgColor="#151515"
    >
      <Flex></Flex>
    </SectionLayout>
  );
};

const plans = [
  {
    durarion: "3 months",
    price: "350 Egp",
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
