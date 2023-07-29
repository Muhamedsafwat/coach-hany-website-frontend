import React from "react";
import { Stack, Box, Text, StackDivider } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineForm, AiOutlineUser, AiOutlineDollar } from "react-icons/ai";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Stack direction="row" bg="#0f0f0f" minH="100vh" as="main">
        <NavBar />
        {children}
      </Stack>
    </>
  );
};

const Header = () => {
  return (
    <Stack p="1rem" justify="space-between" direction="row">
      <Text>Admin</Text>
      <Stack direction="row">
        <Link href="/admin">Dashboard</Link>
        <StackDivider />
        <Link href="/">Home page</Link>
      </Stack>
    </Stack>
  );
};

const NavBar = () => {
  const router = useRouter();
  const route = router.pathname;

  const viewNav =
    route == "/admin" ||
    route == "/admin/plans" ||
    route == "/admin/users" ||
    route == "/admin/applications";

  return viewNav ? (
    <Stack spacing="0" bg="#191919" w="20vw">
      {navLinks.map((item, index) => (
        <NavLink key={index} {...item} />
      ))}
    </Stack>
  ) : null;
};

const NavLink = ({ label, path, icon, isActive }) => {
  return (
    <Box
      transition=".3s"
      borderWidth="1px 0 1px 0"
      borderColor="#333"
      paddingBlock="10px"
      paddingInline="1rem"
      _hover={{ paddingLeft: "1.2rem", bg: "#313131" }}
    >
      <Link href={path}>
        <Stack align="center" direction="row">
          {icon} <Text> {label}</Text>
        </Stack>
      </Link>
    </Box>
  );
};

const navLinks = [
  { label: "Plans", path: "/admin/plans", icon: <AiOutlineDollar /> },
  {
    label: "Applications",
    path: "/admin/applications",
    icon: <AiOutlineForm />,
  },
  { label: "Users", path: "/admin/users", icon: <AiOutlineUser /> },
];
export default AdminLayout;
