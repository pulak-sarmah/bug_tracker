"use client";
import { Box } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoBugOutline } from "react-icons/io5";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

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
    <nav className="flex-center space-x-6 border-b mb-5 px-5 h-14 ">
      <Link href="/">
        <IoBugOutline size={25} className="nav-effects" />
      </Link>
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
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Sign Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Sign In</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
