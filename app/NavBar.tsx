"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBugOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

const NavBar = () => {
  return (
    <nav className=" border-b mb-5 px-5 h-14 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href="/">
              <IoBugOutline size={25} className="nav-effects" />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <RxAvatar size={"30"} />;
  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {session.user!.image ? (
              <Avatar
                src={session.user!.image!}
                fallback="?"
                size={"2"}
                radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Box className="w-8 h-8 rounded-full bg-slate-600"></Box>
            )}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size={"2"}>{session.user?.email}</Text>
            </DropdownMenu.Label>
            <Link href="/api/auth/signout" className="nav-links">
              <DropdownMenu.Item>Sign Out</DropdownMenu.Item>
            </Link>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">
          <Button variant="soft"> Sign In</Button>
        </Link>
      )}
    </Box>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    {
      label: "Dashboard",
      href: "/",
      id: 1,
    },
    {
      label: "Issues",
      href: "/issues",
      id: 2,
    },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <Link href={link.href} key={link.id} className="nav-links">
          <li
            className={classNames({
              "border-b border-zinc-800": link.href === currentPath,
              "nav-effects": true,
            })}
          >
            {link.label}
          </li>
        </Link>
      ))}
    </ul>
  );
};
export default NavBar;
