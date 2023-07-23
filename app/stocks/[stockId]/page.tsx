"use client";
import { Chart } from "@/components/pages/stocks/Chart/Chart";
import { Cup } from "@/components/pages/stocks/Cup/Cup";
import { useStock } from "@/hooks";
import { useStockCup } from "@/hooks/stocks/useStockCup";

import styles from "./page.module.css";
import { BuyStockForm } from "@/components/common/form/BuyStockForm/BuyStockForm";

export default function StockPage({ params: { stockId } }: { params: { stockId: string } }) {
   const numberedStockId = Number(stockId);
   const { cup } = useStockCup(numberedStockId);
   const { stock } = useStock(stockId);

   return (
      <div className={styles.content}>
         <div>
            {/* График */}
            <Chart />
            {/* Место для покупки */}
            <BuyStockForm />
         </div>

         {/* Стакан */}
         <Cup cup={cup} />
      </div>
   );
}
