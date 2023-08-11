import React from "react";
import { Stack, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Stack
      as="section"
      align={["center", "center", "flex-end"]}
      textAlign={["center", "center", "start"]}
      justify="center"
      paddingInline={["1vw", "1vw", "3vw"]}
      backgroundImage="url('/hero-1.jpg')"
      maxW="100vw"
      h="100vh"
      boxSizing="border-box"
    >
      <Stack
        align={["center", "center", "flex-start"]}
        marginInline={[0, 0, "2rem", "5rem"]}
      >
        <Text
          fontSize={["1.1rem", "1.1rem", "1.4rem"]}
          letterSpacing="6px"
          fontWeight="bold"
        >
          SHAPE YOUR BODY
        </Text>
        <Text
          lineHeight="1.1"
          fontSize={["3rem", "3rem", "4.5rem"]}
          letterSpacing="2px"
          fontWeight="extrabold"
        >
          BE{" "}
          <Text as="span" display="inline" color="brand">
            STRONG
          </Text>{" "}
          <br />
          TRAIN HARD
        </Text>
        <Link href="/register">
          <Button
            borderRadius={0}
            w="fit-content"
            paddingBlock={5}
            paddingInline={12}
            mt={5}
            variant="solid"
            bg="brand"
            letterSpacing={2}
            fontWeight="bold"
          >
            JOIN US
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default HeroSection;
