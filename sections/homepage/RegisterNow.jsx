import React from "react";
import { Button, Text, Box, Stack } from "@chakra-ui/react";
import { BsWhatsapp } from "react-icons/bs";

const RegisterNow = () => {
  return (
    <Stack
      align="center"
      justify="center"
      minH="500px"
      paddingBlock="5rem"
      textAlign="center"
      as="section"
      bg="url('/join.jpg')"
      bgSize="cover"
      bgPosition="center"
    >
      <Text fontWeight="bold" fontSize={["1.5rem", "1.5rem", "2.5rem"]}>
        REGISTER NOW TO GET MORE DEALS
      </Text>
      <Text
        marginBlock={[2, 2, 5]}
        color="#ddd"
        fontSize={["1rem", "1rem", "1.5rem"]}
      >
        WHERE HEALTH, BEAUTY AND FITNESS MEET.
      </Text>
      <Button
        mt="1rem"
        bg="brand"
        size={["md", "md", "lg"]}
        leftIcon={<BsWhatsapp />}
      >
        CONTACT US
      </Button>
    </Stack>
  );
};

export default RegisterNow;
