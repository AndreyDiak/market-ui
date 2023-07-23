import { StockPreviewAll } from "@/typings";
import { Noto_Sans } from "next/font/google";

import { useStock } from "@/hooks/stocks/useStock";
import { classNames } from "@/utils";
import Link from "next/link";
import styles from "./StockCard.module.css";

import React from "react";

const notoSans = Noto_Sans({
   weight: "500",
   subsets: ["cyrillic"],
});

interface Props {
   preview: StockPreviewAll;
}

export const StockCard: React.FC<Props> = React.memo(({ preview }) => {
   const { stock } = useStock(String(preview.id));

   return (
      <Link href={`stocks/${preview.id}`} className={classNames(styles.card, notoSans.className)}>
         <div>
            {/* Место под фотку акции */}
            <div>
               <div className={styles.name}>{preview.name}</div>
               {/* Место под тег акции */}
            </div>
         </div>
         <div>
            <div className={styles.price}>{stock.lastPrice}$</div>
            <div>{/* место под изменение цены */}</div>
         </div>
      </Link>
   );
});

StockCard.displayName = "StockCard";
