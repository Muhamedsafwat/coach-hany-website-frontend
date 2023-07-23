import React from "react";
import { SimpleGrid, Box, Stack, Text, Flex } from "@chakra-ui/react";
//icons
import { GiFruitBowl } from "react-icons/gi";
import { BiDumbbell } from "react-icons/bi";
import { BsFillHeartPulseFill } from "react-icons/bs";

import SectionLayout from "../SectionLayout";
const Advantages = () => {
  return (
    <SectionLayout
      heading="why choose us?"
      subHeading="push your limits forward"
      bgColor="#0f0f0f"
    >
      <Flex direction="row" justify="space-around" flexWrap="wrap">
        {cards.map((cardData, index) => (
          <Card {...cardData} key={index} />
        ))}
      </Flex>
    </SectionLayout>
  );
};

const Card = ({ icon, title, details }) => {
  return (
    <Stack marginBlock="2rem" maxW="300px" align="center" justify="center">
      <Box
        transition=".3s"
        padding="1.1rem"
        borderRadius="50%"
        bg="#333"
        color="brand"
        _hover={{ bgColor: "brand", color: "white" }}
      >
        {icon}
      </Box>
      <Text fontWeight="700" fontSize="1.2rem">
        {title}
      </Text>
      <Text>{details}</Text>
    </Stack>
  );
};

const cards = [
  {
    icon: <GiFruitBowl size={50} />,
    title: "Healthy nutrition plan",
    details:
      "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis",
  },
  {
    icon: <BiDumbbell size={50} />,
    title: "Proffesional training plan",
    details:
      "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis",
  },
  {
    icon: <BsFillHeartPulseFill size={50} />,
    title: "Unique to your needs",
    details:
      "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis",
  },
];
export default Advantages;
