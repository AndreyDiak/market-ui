import { getStockCupByStockId } from "@/app/api/stocks/route";
import { Cup, Operation } from "@/typings";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Socket, io } from "socket.io-client";

export interface StockCup {
   buy: Cup[];
   sell: Cup[];
}

interface UseStockCup {
   cup: StockCup;
   updateCup(type: Operation): void;
   bestPriceToBuy: number;
}

const DEFAULT_CUP: StockCup = {
   sell: [],
   buy: [],
};

let socket: Socket;

export function useStockCup(stockId: number): UseStockCup {
   if (!socket) {
      socket = io("http://localhost:3000/cup", {
         query: {
            stockId,
         },
      });
   }

   const [cup, setCup] = useState<StockCup>(DEFAULT_CUP);

   useEffect(() => {
      getStockCupByStockId(stockId);
   }, []);

   const updateCup = useCallback((type: Operation) => {
      socket.emit("cupByStockId:update", {
         type,
      });
   }, []);

   const bestPriceToBuy = useMemo(() => cup.buy[0]?.price ?? 0, [cup]);

   return useMemo(() => {
      return {
         cup,
         updateCup,
         bestPriceToBuy,
      };
   }, [cup, bestPriceToBuy]);
}
