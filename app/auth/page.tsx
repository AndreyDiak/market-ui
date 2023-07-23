"use client";
import { AuthForm } from "@/components";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Auth() {
   return (
      <div className={inter.className}>
         <AuthForm />
      </div>
   );
}
