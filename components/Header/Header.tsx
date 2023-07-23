import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";

interface HeaderLink {
   path: string;
   to: string;
}

const links: HeaderLink[] = [
   {
      path: "main",
      to: "/",
   },
   // {
   //    path: "auth",
   //    to: "/auth",
   // },
   {
      path: "portfolio",
      to: "/portfolio",
   },
   {
      path: "stocks",
      to: "/stocks",
   },
];

export const Header: React.FC = React.memo(() => {
   return (
      <header className={styles.header}>
         {links.map((link) => (
            <Link href={link.to} key={link.path} className={styles.link}>
               {link.path}
            </Link>
         ))}
      </header>
   );
});

Header.displayName = "Header";
