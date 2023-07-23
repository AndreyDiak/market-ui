import { getStockById } from "@/app/api/stocks/route";
import { StockFindById } from "@/typings";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseStock {
   stock: StockFindById;
}

export function useStock(stockId: string): UseStock {
   // добавить в zustand?
   // TODO @raymix
   const [stock, setStock] = useState<StockFindById>({} as StockFindById);

   const getData = useCallback(async () => {
      const rawStock = await getStockById(Number(stockId));
      if (rawStock) {
         setStock(rawStock);
      }
   }, [stockId]);

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
         stock,
      };
   }, [stock]);
}
