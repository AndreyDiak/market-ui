import { User, UserById } from "@/typings";
import { fetchWithBaseUrl } from "./../index";

const usersFetch = fetchWithBaseUrl("users");

export async function me(): Promise<User | null> {
   const res = await usersFetch("me", {
      method: "GET",
      credentials: "include",
   });

   if (!res.ok) {
      return null;
   }

   return res.json();
}

export async function findUserById(id: string): Promise<UserById | null> {
   const res = await usersFetch(id, {
      method: "GET",
      credentials: "include",
   });

   if (!res.ok) {
      return null;
   }

   return res.json();
}
