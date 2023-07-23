import React, { InputHTMLAttributes, ReactNode } from "react";
import { Input } from "../Input/Input";
import { Inter } from "next/font/google";

import styles from "./AuthInput.module.css";
import { classNames } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export const AuthInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = React.memo(
   ({ ...args }) => (
      <span className={styles.container}>
         <span className={styles.label}>{args?.name?.toUpperCase()}</span>
         <Input className={classNames(styles.input, inter.className)} autoComplete="on" {...args} />
      </span>
   ),
);

AuthInput.displayName = "AuthInput";
