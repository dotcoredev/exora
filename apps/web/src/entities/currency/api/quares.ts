import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getCurrencies } from "./get-currencies";
import { Currency } from "../model/currency.types";

export function useCurrencies(): UseQueryResult<Currency[], Error> {
	return useQuery({
		queryKey: ["currencies"],
		queryFn: getCurrencies,
	});
}
