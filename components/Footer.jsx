import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      borderTop="1px"
      borderTopColor="#333"
      bg="#191919"
      padding="1rem"
      as="footer"
      textAlign="center"
      position="absolute"
      bottom="0"
      left="0"
      right="0"
    >
      <Text fontSize=".9rem">
        Copyright ©2023 All rights reserved | This website is made by
        <a target="_blank" href="https://github.com/Muhamedsafwat/">
        <Text cursor="pointer" as="span" color="brand">
          {" "}
          Muhamed Safwat
        </Text>
          </a>
      </Text>
    </Box>
  );
};

export default Footer;
