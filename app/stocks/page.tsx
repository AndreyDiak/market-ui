"use client";
import { StockCard } from "@/components/pages/stocks/StockCard";
import { useStocks } from "@/hooks";
import styles from "./page.module.css";

export default function StocksPage() {
   const { stocks, isAbleToFetch, fetchStocks } = useStocks();

   return (
      <div>
         <div>stocks</div>
         <div className={styles.list}>
            {stocks.map((stock) => (
               <StockCard key={Math.random()} preview={stock} />
            ))}
            {isAbleToFetch && (
               <button onClick={async () => await fetchStocks()}>Fetch stocks</button>
            )}
         </div>
      </div>
   );
}
