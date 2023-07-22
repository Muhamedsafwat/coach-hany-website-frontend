import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { FiMail, FiSmartphone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import SectionLayout from "../SectionLayout";

const Contact = () => {
  return (
    <SectionLayout
      heading="contact us"
      subHeading="got any questions?"
      bgColor="#191919"
    >
      <Flex direction="row" justify="center" gap="5rem" flexWrap="wrap">
        {contacts.map((item) => (
          <Card {...item} />
        ))}
      </Flex>
    </SectionLayout>
  );
};

const Card = ({ icon, text }) => {
  return (
    <Flex mt="-1rem" cursor="pointer" gap="1rem" align="center">
      <Box
        transition=".3s"
        padding="1.1rem"
        borderRadius="50%"
        bg="brand"
        color="white"
        _hover={{ bgColor: "#333", color: "brand" }}
      >
        {icon}
      </Box>
      <Text> {text} </Text>
    </Flex>
  );
};

const contacts = [
  {
    icon: <FiMail size={25} />,
    text: "Eldonhnay@gmail.com",
  },
  {
    icon: <FaWhatsapp size={25} />,
    text: "+201016596908",
  },
  {
    icon: <FiSmartphone size={25} />,
    text: "+201016596908",
  },
];
export default Contact;
