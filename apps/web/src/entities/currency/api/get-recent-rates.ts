import { api } from "@/shared/api";
import type { RecentRate } from "../model/currency.types";

type GetExchangeRateParams = {
	from: string | null;
	to: string | null;
	signal?: AbortSignal;
};

export async function getRecentRates({
	from,
	to,
	signal,
}: GetExchangeRateParams): Promise<RecentRate[]> {
	const { data } = await api.get<RecentRate[]>("/rates/history", {
		params: {
			base: from,
			quote: to,
			from: "1Y",
		},
		signal,
	});

	return data.map((item) => ({
		...item,
		time: new Date(item.date).toLocaleDateString("ru-RU"),
		value: Number(Number(item.rate)).toFixed(4),
	}));
}
