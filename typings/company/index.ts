import { Stock, StockPreview } from "../stock";

export interface Company {
   id: number;
   name: string;
   description: String;
   createdAt: Date;
}

export interface CompanyFindById extends Company {
   stock: Stock;
}

export type CompanyPreview = Pick<Company, "id" | "name">;

export interface CompanyFindByName extends CompanyPreview {
   stock: StockPreview;
}
