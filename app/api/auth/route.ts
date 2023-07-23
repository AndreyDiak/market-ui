import { UserErrorRes, UserLoginData, UserLoginRes, UserSignupData } from "@/typings";
import { toast } from "react-toastify";
import { fetchWithBaseUrl } from "..";

enum ENDPOINTS {
   SIGN_UP = "signup",
   SIGN_IN = "login",
   LOG_OUT = "logout",
}

const usersFetch = fetchWithBaseUrl("users");

export async function signUp(signupData: UserSignupData): Promise<any | undefined> {
   const { name, email, password, repeat } = signupData;

   if (password !== repeat) {
      toast.warning("Password mismatch!");
      return;
   }

   const res = await usersFetch(ENDPOINTS.SIGN_UP, {
      body: JSON.stringify({ name, email, password }),
      headers: {
         "Content-Type": "application/json",
      },
      method: "POST",
   });

   if (!res.ok) {
      const { message } = (await res.json()) as UserErrorRes;
      toast.warning(Array.isArray(message) ? message[0] : message);
      return;
   } else {
      toast.success("You have successfully registered!");
   }

   return res.json();
}

export async function signIn(signinData: UserLoginData): Promise<UserLoginRes | undefined> {
   const { email, password } = signinData;

   const res = await usersFetch(ENDPOINTS.SIGN_IN, {
      body: JSON.stringify({ email, password }),
      headers: {
         "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
   });

   if (!res.ok) {
      const { message } = (await res.json()) as UserErrorRes;
      toast.warning(message);
      return;
   }

   return res.json();
}

export async function signOut(): Promise<{ message: string }> {
   const res = await usersFetch(ENDPOINTS.LOG_OUT);
   return res.json();
}
