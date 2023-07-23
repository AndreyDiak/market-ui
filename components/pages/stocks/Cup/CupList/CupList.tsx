import React from "react";
import { Cup, Operation } from "@/typings";
import { CupInfo } from "../CupInfo/CupInfo";
import { classNames } from "@/utils";

import styles from "./CupList.module.css";

interface Props {
   list: Cup[];
   type: Operation;
   totalCount: number;
}

const typeToTextMap: Record<Operation, string> = {
   BUY: "Покупка",
   SELL: "Продажа",
};

export const CupList: React.FC<Props> = React.memo(({ list, type, totalCount }) => {
   return (
      <div className={classNames(type === "BUY" ? styles.sell : styles.buy, styles.content)}>
         <h6 className={styles.contentHeader}>{typeToTextMap[type]}</h6>
         <div className={styles.list}>
            {list.map((item) => (
               <CupInfo key={item.id} cup={item} type={type} totalCount={totalCount} />
            ))}
         </div>
      </div>
   );
});

CupList.displayName = "CupList";
