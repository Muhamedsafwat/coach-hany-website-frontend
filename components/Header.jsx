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
  DrawerHeader,
  Divider,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useMediaQuery,
  Flex,
} from "@chakra-ui/react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import {
  AiOutlineDollar,
  AiOutlineForm,
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlinePhone,
  AiOutlineLogin,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

import { UserInfo } from "../authContext";
import logoutHandler from "../handlers/logoutHandler";

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
      paddingBlock={8}
      paddingInline={["1vw", "1vw", "3vw"]}
      boxSizing="border-box"
    >
      <Stack direction="row" justify="space-between">
        <Box w="100px">
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
        {user
          ? userLinks.map((item, index) => <NavItem key={index} {...item} />)
          : links.map((item, index) => <NavItem key={index} {...item} />)}
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

  const { user } = useContext(UserInfo);

  return (
    <>
      <Button
        size="sm"
        ref={btnRef}
        color="brand"
        onClick={onOpen}
        variant="ghost"
      >
        <FiMenu size={20} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="#151515">
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            {user ? (
              <Stack spacing={0}>
                {userLinks.map((item, index) => {
                  return (
                    <MobileNavItem onClose={onClose} key={index} {...item} />
                  );
                })}
              </Stack>
            ) : (
              <Stack spacing={0}>
                {links.map((item, index) => {
                  return (
                    <MobileNavItem onClose={onClose} key={index} {...item} />
                  );
                })}
              </Stack>
            )}
            <Divider marginBlock="10px" />

            {user && (
              <Box
                onClick={() => logoutHandler(setIsLoading, logout, router)}
                cursor="pointer"
                transition=".3s"
                _hover={{ bg: "rgba(200,50,50,0.6)" }}
                p="15px"
                borderRadius={10}
              >
                <Flex gap="5px" align="center">
                  <AiOutlineLogout />
                  <Text>Logout</Text>
                </Flex>
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
//mobile nav item
const MobileNavItem = ({ label, path, icon, onClose }) => {
  return (
    <Link href={path}>
      <Box
        onClick={onClose}
        transition=".3s"
        _hover={{ bg: "rgba(50,50,50,0.5)" }}
        p="15px"
        borderRadius={10}
      >
        <Flex gap="5px" align="center">
          {icon}
          <Text>{label}</Text>
        </Flex>
      </Box>
    </Link>
  );
};
//navbar link component
const NavItem = ({ path, label }) => {
  return (
    <Button _hover={{ color: "brand", textDecoration: "none" }} variant="link">
      <Link href={path}>
        <Text fontSize="lg" fontWeight="bold">
          {label}
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
  { label: "Home", path: "/", icon: <AiOutlineHome /> },
  { label: "Services", path: "/#services", icon: <AiOutlineDollar /> },
  { label: "Contact", path: "/#contact", icon: <AiOutlinePhone /> },
  { label: "Register", path: "/register", icon: <AiOutlineForm /> },
  { label: "Login", path: "/login", icon: <AiOutlineLogin /> },
];

//mobile navbar links
const userLinks = [
  { label: "Home", path: "/", icon: <AiOutlineHome /> },
  { label: "Services", path: "#services", icon: <AiOutlineDollar /> },
  { label: "Contact", path: "#contact", icon: <AiOutlinePhone /> },
  { label: "Profile", path: "/profile", icon: <AiOutlineUser /> },
];

//social media links
const socialLinks = [
  { icon: BsFacebook, link: "facebook.com" },
  { icon: BsInstagram, link: "facebook.com" },
  { icon: BsTwitter, link: "facebook.com" },
];

export default Header;
