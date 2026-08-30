import { api } from "@/shared/api";
import type { Currency } from "../model/currency.types";

export async function getPopularCurrencies(): Promise<Currency[]> {
	try {
		const data = await api.get("/currency/popular");
		return data?.data ?? [];
	} catch (err) {
		console.error(err);
		return [];
	}
}
