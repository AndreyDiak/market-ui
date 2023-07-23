import { TRADE_OPERATION_TYPE } from "@/typings";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AuthInput, Input } from "../../input";
import { useParams, useRouter } from "next/navigation";
import { buyStock } from "@/app/api/stocks/route";
import { useStockCup } from "@/hooks/stocks/useStockCup";

interface Props {}

interface FormData {
   count: number;
   type: TRADE_OPERATION_TYPE;
}

export const BuyStockForm: React.FC<Props> = React.memo(() => {
   const { stockId } = useParams();

   const { bestPriceToBuy, updateCup } = useStockCup(Number(stockId));

   console.log(bestPriceToBuy);

   const { resetField, control, handleSubmit } = useForm<FormData>({
      defaultValues: {
         count: 0,
         type: TRADE_OPERATION_TYPE.BEST_PRICE,
      },
   });

   const onSubmit: SubmitHandler<FormData> = async (data) => {
      await buyStock(Number(stockId), {
         count: Number(data.count),
         buyType: data.type,
         price: bestPriceToBuy,
      });
      updateCup("BUY");
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div>
            <Input value={bestPriceToBuy} /> <br /> <br />
            <Controller
               name="count"
               control={control}
               render={({ field }) => <Input type="number" {...field} />}
            />
         </div>
         <button type="submit">Купить</button>
      </form>
   );
});
