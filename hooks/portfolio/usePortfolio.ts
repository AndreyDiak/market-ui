import { useCallback, useEffect, useMemo, useState } from "react";
import { Portfolio } from "@/typings";
import { my } from "@/app/api/portfolio/route";

interface UsePortfolio {
   portfolio: Portfolio;
}

export function usePortfolio(): UsePortfolio {
   // добавить в zustand?
   // TODO @raymix
   const [rawPortfolio, setRawPortfolio] = useState<Portfolio>({} as Portfolio);

   const getData = useCallback(async () => {
      const portfolio = await my();
      if (portfolio) {
         setRawPortfolio(portfolio);
      }
   }, []);

   useEffect(() => {
      let active = true;

      if (active) {
         getData();
      }

      return () => {
         active = false;
      };
   }, [getData]);

   return useMemo(() => {
      return {
         portfolio: rawPortfolio,
      };
   }, [rawPortfolio]);
}
