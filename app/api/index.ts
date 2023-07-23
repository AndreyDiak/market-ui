import { curry } from "ramda";

export const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "";

export const PAGINATION_LIMIT = 50;

export const CUP_PAGINATION_LIMIT = 5;

const fetchWithParams = (
   baseUrl: string,
   mainPath: string,
   paramPath: string,
   req?: RequestInit | undefined,
) => fetch(`${baseUrl}/${mainPath}/${paramPath}`, req);

const curriedFetch = curry(fetchWithParams);

export const fetchWithBaseUrl = curriedFetch(BASE_URL);
