"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoBugOutline } from "react-icons/io5";

const NavBar = () => {
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
    <nav className="flex-center space-x-6 border-b mb-5 px-5 h-14 ">
      <Link href="/">
        <IoBugOutline size={25} className="nav-effects" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li
            className={classNames({
              "border-b border-zinc-800": link.href === currentPath,
              "nav-effects": true,
            })}
            key={link.id}
          >
            <Link href={link.href} className="nav-links">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
