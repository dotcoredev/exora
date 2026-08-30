import { api } from "@/shared/api";
import { CurrencyRate } from "../model/currency.types";

type GetExchangeRateParams = {
	from: string | null;
	to: string | null;
	signal?: AbortSignal;
};

export async function getExchangeRate({
	from,
	to,
	signal,
}: GetExchangeRateParams): Promise<CurrencyRate[]> {
	const { data } = await api.get("/rates", {
		params: {
			base: from,
			quotes: to,
		},
		signal,
	});

	return data;
}
