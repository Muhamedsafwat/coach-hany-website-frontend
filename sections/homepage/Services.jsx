import React from "react";
import { SimpleGrid, Box, Text, Stack } from "@chakra-ui/react";

import SectionLayout from "../SectionLayout";

const Services = () => {
  return (
    <SectionLayout
      heading="our services"
      subHeading="what we can offer"
      bgColor="#191919"
      sectionId="services"
    >
      <SimpleGrid justifyContent="center" minChildWidth="300px" spacing={10}>
        {services.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </SimpleGrid>
    </SectionLayout>
  );
};

const Card = ({ img, title, details }) => {
  return (
    <Stack
      minH="20rem"
      transition="0.3s"
      _hover={{ transform: "translatey(-5px)" }}
      textAlign="start"
      bg="black"
    >
      <Box width="100%" flex={4}>
        <img
          style={{ height: "100%", objectFit: "cover" }}
          src={img}
          alt={title}
        />
      </Box>
      <Stack flex={1} justify="space-between" p={5}>
        <Text fontSize="1.1rem" fontWeight="700" color="brand">
          {title}
        </Text>
        <Text>{details}</Text>
      </Stack>
    </Stack>
  );
};

const services = [
  {
    img: "/loss.jpg",
    title: "Weight loss",
    details: "Maintain your current weight and shape your body",
  },
  {
    img: "/gain.jpg",
    title: "Gain weight",
    details: "Maintain your current weight and shape your body",
  },
  {
    img: "/maintain.jpg",
    title: "Maintain",
    details: "Maintain your current weight and shape your body",
  },
  {
    img: "/pressure.jpg",
    title: "Blood pressure",
    details: "Maintain your blood pressure and improve health",
  },
  {
    img: "/pco.png",
    title: "Diabets",
    details: "Maintain your current weight and shape your body",
  },
  {
    img: "/report.png",
    title: "Diabets",
    details: "Maintain your current weight and shape your body",
  },
];

export default Services;
