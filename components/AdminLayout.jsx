import React, { useContext, useState } from "react";

import {
  Stack,
  Box,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  Flex,
  Divider,
} from "@chakra-ui/react";

import { FiMenu } from "react-icons/fi";
import {
  AiOutlineForm,
  AiOutlineUser,
  AiOutlineDollar,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";

import Link from "next/link";
import { useRouter } from "next/router";

import { UserInfo } from "../authContext";

import Loading from "./Loading";

const AdminLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Header setIsLoading={setIsLoading} />
      {isLoading ? <Loading /> : <>{children}</>}
    </>
  );
};

const Header = ({ setIsLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  //logout
  const router = useRouter();
  const { logout } = useContext(UserInfo);
  const logoutHandler = () => {
    setIsLoading(true);
    router.push("/");
    logout();
  };
  return (
    <Stack
      justify="space-between"
      align="center"
      paddingInline="3rem"
      paddingBlock="1rem"
      direction="row"
      borderBottom="1px"
      borderColor="#333"
    >
      <Box w="100px">
        <Link href="/">
          <img src="/logo.png" alt="logo" />
        </Link>
      </Box>
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
          <DrawerHeader>Admin Dashboard</DrawerHeader>

          <DrawerBody>
            <Stack spacing={0}>
              {adminNavLinks.map((item, index) => {
                return <NavItem onClose={onClose} key={index} {...item} />;
              })}
            </Stack>
            <Divider marginBlock="10px" />
            <NavItem
              onClose={onClose}
              label="Home page"
              path="/"
              icon={<AiOutlineHome />}
            />
            <Divider marginBlock="10px" />
            <Box
              onClick={logoutHandler}
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

const NavItem = ({ label, path, icon, onClose }) => {
  return (
    <Box
      onClick={onClose}
      transition=".3s"
      _hover={{ bg: "rgba(50,50,50,0.5)" }}
      p="15px"
      borderRadius={10}
    >
      <Link href={path}>
        <Flex gap="5px" align="center">
          {icon}
          <Text>{label}</Text>
        </Flex>
      </Link>
    </Box>
  );
};

const adminNavLinks = [
  { label: "Plans", path: "/admin", icon: <AiOutlineDollar /> },
  {
    label: "Applications",
    path: "/admin/applications",
    icon: <AiOutlineForm />,
  },
  { label: "Users", path: "/admin/users", icon: <AiOutlineUser /> },
];

export default AdminLayout;
