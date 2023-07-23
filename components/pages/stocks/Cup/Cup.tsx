import { StockCup } from "@/hooks/stocks/useStockCup";
import React, { useMemo } from "react";

import styles from "./Cup.module.css";
import { CupList } from "./CupList/CupList";

interface Props {
   cup: StockCup;
}

export const Cup: React.FC<Props> = React.memo(({ cup }) => {
   console.log(cup);
   const totalStocksToBuyCount = useMemo(
      () => cup.buy?.reduce((acc, cup) => acc + cup.totalCount, 0),
      [cup]
   );

   const totalStocksToSellCount = useMemo(
      () => cup.sell?.reduce((acc, cup) => acc + cup.totalCount, 0),
      [cup]
   );

   return (
      <div className={styles.content}>
         <h4 className={styles.header}>Стакан</h4>
         <div className={styles.lists}>
            <CupList list={cup.sell} type={"BUY"} totalCount={totalStocksToSellCount} />
            <CupList list={cup.buy} type={"SELL"} totalCount={totalStocksToBuyCount} />
         </div>
      </div>
   );
});

Cup.displayName = "Cup";
