import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getCurrencies } from "./get-currencies";
import { Currency } from "../model/currency.types";
import { getPopularCurrencies } from "./get-popular-currencies";

export function useCurrencies(): UseQueryResult<Currency[], Error> {
	return useQuery({
		queryKey: ["currencies"],
		queryFn: getCurrencies,
		staleTime: 1000 * 60 * 60, // 1 час данные считаются свежими
		gcTime: 1000 * 60 * 60, // 1 час держим неактивный кэш

		retry: 2,

		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
}

export function usePopularCurrencies(): UseQueryResult<Currency[], Error> {
	return useQuery({
		queryKey: ["currencies/popular"],
		queryFn: getPopularCurrencies,
		staleTime: 1000 * 60 * 60, // 1 час данные считаются свежими
		gcTime: 1000 * 60 * 60, // 1 час держим неактивный кэш

		retry: 2,

		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
}
