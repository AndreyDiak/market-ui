import { Cup, Operation } from "@/typings";
import { classNames } from "@/utils";
import React from "react";

import styles from "./CupInfo.module.css";

interface Props {
   cup: Cup;
   type: Operation;
   totalCount: number;
}

export const CupInfo: React.FC<Props> = React.memo(({ cup, type, totalCount }) => {
   const isForSell = type === "SELL";

   const portion = Number((cup.totalCount / totalCount).toFixed(2));

   return (
      <div className={classNames(styles.item, isForSell && styles.reverse)}>
         <span className={classNames(styles.price)}>{cup.price}$</span>
         <span className={classNames(styles.count, isForSell ? styles.sell : styles.buy)}>
            <span>{cup.totalCount}</span>
         </span>
         <span
            className={classNames(
               styles.portion,
               isForSell ? styles.portionRight : styles.portionLeft
            )}
            style={{
               width: `${portion * 80}%`,
            }}
         ></span>
      </div>
   );
});

CupInfo.displayName = "CupInfo";
