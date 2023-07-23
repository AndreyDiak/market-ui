"use client";
import React, { useState } from "react";
import { AuthInput } from "../../input";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import styles from "./AuthForm.module.css";

type Mode = "signup" | "signin";

interface FormData {
   email: string;
   username: string;
   password: string;
   repeat: string;
}

export const AuthForm: React.FC = React.memo(() => {
   const [mode, setMode] = useState<Mode>("signin");

   const { onSignIn, onSignUp, loading } = useAuth();

   const isSignupMode = mode === "signup";

   const router = useRouter();

   const {
      resetField,
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({
      defaultValues: {
         email: "",
         username: "",
         password: "",
         repeat: "",
      },
   });

   const onSignupSubmit: SubmitHandler<FormData> = async (data) => {
      await onSignUp(data, () => {
         resetField("username", { defaultValue: "" });
         resetField("repeat", { defaultValue: "" });
         setMode("signin");
      });
   };

   const onSigninSubmit: SubmitHandler<FormData> = async (data) => {
      await onSignIn(data, () => {
         resetField("email");
         resetField("password");
         router.push("/portfolio");
      });
   };

   const onErrors = (err: any) => {
      toast.warning("Some of required fields are empty!");
   };

   return (
      <form
         className={styles.form}
         onSubmit={handleSubmit(mode === "signup" ? onSignupSubmit : onSigninSubmit, onErrors)}
      >
         <div className={styles.type}>
            <span
               onClick={() => setMode("signin")}
               className={mode === "signin" ? styles.active : undefined}
            >
               SIGN IN
            </span>
            <span
               onClick={() => setMode("signup")}
               className={isSignupMode ? styles.active : undefined}
            >
               SIGN UP
            </span>
         </div>

         <div>
            <Controller
               name="email"
               control={control}
               render={({ field }) => <AuthInput type="text" {...field} />}
            />
            {isSignupMode && (
               <Controller
                  name="username"
                  control={control}
                  render={({ field }) => <AuthInput type="text" {...field} />}
               />
            )}
            <Controller
               name="password"
               control={control}
               render={({ field }) => <AuthInput type="password" {...field} />}
            />
            {isSignupMode && (
               <Controller
                  name="repeat"
                  control={control}
                  render={({ field }) => <AuthInput type="password" {...field} />}
               />
            )}
         </div>
         <button className={styles.button} type="submit" disabled={loading}>
            {loading ? <BeatLoader color="white" /> : mode === "signin" ? "SIGN IN" : "SIGN UP"}
         </button>
      </form>
   );
});

AuthForm.displayName = "AuthForm";
