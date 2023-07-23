import { PAGINATION_LIMIT } from "@/app/api";
import { getAllStocks, getStocksCount as getCount } from "@/app/api/stocks/route";
import { StockPreviewAll } from "@/typings";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseStocks {
   stocks: StockPreviewAll[];
   isAbleToFetch: boolean;
   fetchStocks(): Promise<void>;
}

export function useStocks(): UseStocks {
   const [stocks, setStocks] = useState<StockPreviewAll[]>([]);
   const [pagesCount, setPagesCount] = useState(1);
   const [currentPage, setCurrentPage] = useState(1);
   const isAbleToFetch = useMemo(() => pagesCount + 1 > currentPage, [currentPage, pagesCount]);
   // const lastScrollTop = useRef(0);

   const getStocksCount = useCallback(async () => {
      const count = await getCount();
      setPagesCount(Math.ceil(count / PAGINATION_LIMIT));
   }, []);

   const fetchStocks = useCallback(async () => {
      const rawStocks = await getAllStocks(currentPage);

      if (rawStocks) {
         setCurrentPage((prev) => prev + 1);
         setStocks((prevStocks) => [...prevStocks, ...rawStocks]);
      }
   }, [currentPage]);

   // const onScroll = useCallback(async () => {
   //    if (!isAbleToFetch) {
   //       return;
   //    }
   //    const isNeededToFetch =
   //       // @ts-ignore
   //       listRef.current.getBoundingClientRect().bottom - window.innerHeight < 1000 &&
   //       window.scrollY > lastScrollTop.current &&
   //       isAbleToFetch;

   //    if (isNeededToFetch) {
   //       await fetchStocks();
   //    }

   //    lastScrollTop.current = window.scrollY;
   // }, [fetchStocks, isAbleToFetch, listRef]);

   // const debouncedScroll = debounce(onScroll, 500);
   // const throttledScroll = useMemo(
   //    (currentPage: number) => throttle(() => onScroll(currentPage), 700),
   //    [onScroll]
   // );

   // const { throttledFn } = useThrottledFunction({
   //    callbackFn: onScroll,
   //    throttleMs: 700,
   // });

   useEffect(() => {
      let active = true;

      fetchStocks();
      getStocksCount();

      return () => {
         active = false;
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return useMemo(() => {
      return {
         stocks,
         isAbleToFetch,
         fetchStocks,
      };
   }, [fetchStocks, isAbleToFetch, stocks]);
}
