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
      <a
        target="_blank"
        href="https://api.whatsapp.com/send?phone=201014566873&text=%D8%AA%D9%81%D8%A7%D8%B5%D9%8A%D9%84%20%D8%A7%D9%84%D8%A3%D9%88%D9%86%D9%84%D8%A7%D9%8A%D9%86%20%D9%83%D9%88%D8%B4%D8%AA%D9%86%D8%AC%F0%9F%92%AA"
      >
        <Button
          mt="1rem"
          bg="brand"
          size={["md", "md", "lg"]}
          leftIcon={<BsWhatsapp />}
        >
          CONTACT US
        </Button>
      </a>
    </Stack>
  );
};

export default RegisterNow;
