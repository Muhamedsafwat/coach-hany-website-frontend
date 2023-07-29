import React, { useContext } from "react";
import Link from "next/link";
import {
  Box,
  Stack,
  Button,
  Text,
  Icon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

import { UserInfo } from "../authContext";

const Header = () => {
  const [mobileView] = useMediaQuery("(max-width: 900px)");

  return (
    <Box
      as="header"
      pos="absolute"
      top="0"
      left="0"
      right="0"
      zIndex={2}
      paddingBlock={5}
      paddingInline={["1vw", "1vw", "3vw"]}
      boxSizing="border-box"
    >
      <Stack direction="row" justify="space-between">
        <Box w="150px">
          <Link href="/">
            <img src="/logo.png" alt="logo" />
          </Link>
        </Box>
        {mobileView ? <MobileNav /> : <DesktopNav />}
      </Stack>
    </Box>
  );
};

//desktop navbar
const DesktopNav = () => {
  const { user } = useContext(UserInfo);

  return (
    <Stack flex={1} direction=" row ">
      <Stack flex={1} justify="center" direction="row" spacing={10}>
        {links.map((link, index) => (
          <NavItem key={index} props={link} />
        ))}
        {user ? (
          <NavItem props={{ label: "Profile", path: "/profile" }} />
        ) : (
          <>
            <NavItem props={{ label: "Join us", path: "/register" }} />
            <NavItem props={{ label: "Login", path: "/login" }} />
          </>
        )}
      </Stack>
      <Stack justify="flex-end" direction="row">
        {socialLinks.map((link, index) => (
          <SocialIcon key={index} props={link} />
        ))}
      </Stack>
    </Stack>
  );
};

//mobile navbar
const MobileNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <IconButton
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        icon={<FiMenu size={40} />}
        size="lg"
        variant="ghost"
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Text>hi</Text>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

//navbar link component
const NavItem = ({ props }) => {
  return (
    <Button _hover={{ color: "brand", textDecoration: "none" }} variant="link">
      <Link href={props.path}>
        <Text fontSize="lg" fontWeight="bold">
          {props.label}
        </Text>
      </Link>
    </Button>
  );
};

//social media icon component
const SocialIcon = ({ props }) => {
  return (
    <>
      <Button
        _hover={{ color: "brand", textDecoration: "none" }}
        variant="link"
      >
        <a href={props.link}>
          <Icon boxSize={5} as={props.icon} />
        </a>
      </Button>
    </>
  );
};

//navbar links
const links = [
  { label: "Home", path: "/" },
  { label: "Services", path: "#" },
  { label: "About", path: "#" },
  { label: "Admin", path: "/admin" },
];

//social media links
const socialLinks = [
  { icon: BsFacebook, link: "facebook.com" },
  { icon: BsInstagram, link: "facebook.com" },
  { icon: BsTwitter, link: "facebook.com" },
];

export default Header;
