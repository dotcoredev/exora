import {
	keepPreviousData,
	useQuery,
	type UseQueryResult,
} from "@tanstack/react-query";
import { getCurrencies } from "./get-currencies";
import { Currency, CurrencyRate } from "../model/currency.types";
import { getPopularCurrencies } from "./get-popular-currencies";
import { getExchangeRate } from "./get-exchange-rate";

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

export function useExchangeRate(
	from: string | null,
	to: string | null,
): UseQueryResult<CurrencyRate[], Error> {
	return useQuery({
		queryKey: ["exchange-rate", from, to],

		queryFn: ({ signal }) =>
			getExchangeRate({
				from,
				to,
				signal,
			}),

		enabled: Boolean(from && to && from !== to),
		placeholderData: keepPreviousData,

		staleTime: 1000 * 60 * 5,
	});
}
