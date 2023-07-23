import React, { InputHTMLAttributes, LegacyRef, ReactNode, Ref } from "react";
import styles from "./Input.module.css";
import { classNames } from "@/utils";

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = React.memo(({ ...args }) => {
   return <input {...args} className={classNames(styles.input, args.className)} />;
});

Input.displayName = "Input";
