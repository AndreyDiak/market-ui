"use client";
import { usePortfolio } from "@/hooks";

export default function Portfolio() {
   const {
      portfolio: { stocks },
   } = usePortfolio();

   if (stocks?.length === 0) {
   }

   return <div>Portfolio</div>;
}
