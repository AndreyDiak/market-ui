export interface Portfolio {
   id: number;
   ownerId: number;
   stocks: {
      id: number;
      count: number;
      stockId: number;
   }[];
}
