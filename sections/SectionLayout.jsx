import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

const SectionLayout = ({ children, heading, subHeading, bgColor }) => {
  return (
    <Box
      bg={bgColor}
      textAlign="center"
      paddingBlock="5rem"
      paddingInline={{ base: "1.5rem", md: "3rem", lg: "6rem" }}
    >
      {heading && (
        <Stack mb="3.5rem" fontWeight="700" textTransform="uppercase">
          <Text letterSpacing={1} color="brand">
            {heading}
          </Text>
          <Text fontSize="1.6rem">{subHeading}</Text>
        </Stack>
      )}
      {children}
    </Box>
  );
};

export default SectionLayout;
