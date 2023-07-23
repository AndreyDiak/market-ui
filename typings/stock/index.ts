import { Company, CompanyPreview } from "../company";

export interface Stock {
   id: number;
   name: string;
   description: string;
   lastPrice: number;
   createdAt: Date;
   updatedAt: Date;
   companyId: number;
}

export type StockPreview = Pick<Stock, "id" | "name" | "lastPrice">;

export interface StockPreviewAll extends StockPreview {
   company: CompanyPreview;
}

export interface StockFindById extends Stock {
   company: Company;
}

export enum TRADE_OPERATION_TYPE {
   BEST_PRICE = "best",
   LIMIT_ORDER = "limit",
}
