import Link from "next/link";
import React from "react";
import { IoBugOutline } from "react-icons/io5";

const NavBar = () => {
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
      <ul className="flex space-x-6 ">
        {links.map((link) => (
          <li className="nav-effects" key={link.id}>
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
