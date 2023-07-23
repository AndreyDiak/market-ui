export type Operation = "BUY" | "SELL"

export interface Cup {
   id: number;
   price: number;
   stockId: number;
   totalCount: number;
   type: Operation
}