import { api } from "@/shared/api";
import { Currency } from "../model/currency.types";

export async function getCurrencies(): Promise<Currency[]> {
	try {
		const data = await api.get("/currency");
		return data?.data ?? [];
	} catch (err) {
		console.error(err);
		return [];
	}
}
