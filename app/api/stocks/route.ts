import { Cup, Operation, StockFindById, StockPreviewAll, TRADE_OPERATION_TYPE } from "@/typings";
import { PAGINATION_LIMIT, fetchWithBaseUrl } from "..";
import { Socket, io } from "socket.io-client";

const stocksFetch = fetchWithBaseUrl("stocks");
const cupFetch = fetchWithBaseUrl("cup");

interface BuyStockBody {
   count: number;
   price: number;
   buyType: TRADE_OPERATION_TYPE;
}

export async function getAllStocks(pageIndex: number): Promise<StockPreviewAll[] | null> {
   const res = await stocksFetch(`all?page=${pageIndex}&limit=${PAGINATION_LIMIT}`, {
      method: "GET",
      credentials: "include",
   });

   if (!res.ok) {
      return null;
   }

   return res.json();
}

export async function getStocksCount(): Promise<number> {
   const res = await stocksFetch("count", {
      method: "GET",
      credentials: "include",
   });

   if (!res.ok) {
      return 0;
   }

   return res.json();
}

export async function getStockById(stockId: number): Promise<StockFindById | null> {
   const res = await stocksFetch(`${stockId}`, {
      method: "GET",
      credentials: "include",
   });
   if (!res.ok) {
      return null;
   }

   return res.json();
}

export async function buyStock(stockId: number, body: BuyStockBody): Promise<null> {
   const res = await stocksFetch(`buy/${stockId}`, {
      method: "POST",
      credentials: "include",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
   });

   if (!res.ok) {
      return null;
   }

   return res.json();
}

let socket: Socket;

export async function getStockCupByStockId(stockId: number) {
   if (!socket) {
      socket = io("http://localhost:3000/cup", {
         query: {
            stockId,
         },
      });
   }

   socket.emit("cupByStockId:get", {
      type: "SELL",
   });

   socket.emit("cupByStockId:get", {
      type: "BUY",
   });

   socket.on("message:cupByStockId", (cups: Cup[], type: Operation) => {
      console.log(cups);
      console.log(type);
   });
}
