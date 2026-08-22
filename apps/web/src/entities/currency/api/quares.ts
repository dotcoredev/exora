import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getCurrencies } from "./get-currencies";
import { Currency } from "../model/currency.types";

export function useCurrencies(): UseQueryResult<Currency[], Error> {
	return useQuery({
		queryKey: ["currencies"],
		queryFn: getCurrencies,
		staleTime: 1000 * 60 * 60, // 1 час данные считаются свежими
		gcTime: 1000 * 60 * 60 * 24, // сутки держим неактивный кэш

		retry: 5,

		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
}
