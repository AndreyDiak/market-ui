import { Portfolio } from "@/typings";
import { fetchWithBaseUrl } from "./../index";

const portfolioFetch = fetchWithBaseUrl("portfolio");

export async function my(): Promise<Portfolio | null> {
   const res = await portfolioFetch("my", {
      method: "GET",
      credentials: "include",
   });

   if (!res.ok) {
      return null;
   }

   return res.json();
}
