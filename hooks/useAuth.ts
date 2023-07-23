"use client";
import { signIn, signUp } from "@/app/api/auth/route";
import { me } from "@/app/api/user/route";
import { useAuthStore } from "@/store/user";
import { User, UserLoginData, UserSignupData } from "@/typings";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export interface AuthFormData {
   email: string;
   username: string;
   password: string;
   repeat: string;
}

interface UseAuth {
   user: User | null;
   loading: boolean;
   setUser(user: User | null): void;
   onSignIn(data: AuthFormData, successHandler?: VoidFunction): Promise<void>;
   onSignUp(data: AuthFormData, successHandler?: VoidFunction): Promise<void>;
}

export function useAuth(): UseAuth {
   const rawUser = useAuthStore((state) => state.user);
   const setUser = useAuthStore((state) => state.setUser);

   const [loading, setLoading] = useState(false);

   const getUser = useCallback(async () => {
      const data = await me();
      if (data) {
         setUser(data);
      }
   }, [setUser]);

   const onSignUp = useCallback(async (data: AuthFormData, successHandler?: VoidFunction) => {
      const { username, ...fields } = data;
      const signupData: UserSignupData = { ...fields, name: username };

      try {
         setLoading(true);
         await signUp(signupData);
         successHandler?.();
      } catch (err) {
         toast.error((err as Error).message);
      } finally {
         setLoading(false);
      }
   }, []);

   const onSignIn = useCallback(
      async (data: AuthFormData, successHandler?: VoidFunction) => {
         const { email, password } = data;

         const loginData: UserLoginData = { email, password };

         try {
            setLoading(true);
            const res = await signIn(loginData);
            if (res) {
               await getUser();
               successHandler?.();
            }
         } catch (err) {
            toast.error((err as Error).message);
         } finally {
            setLoading(false);
         }
      },
      [getUser]
   );

   useEffect(() => {
      getUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return useMemo(() => {
      return {
         user: rawUser,
         setUser,
         onSignIn,
         onSignUp,
         loading,
      };
   }, [loading, onSignIn, onSignUp, rawUser, setUser]);
}
