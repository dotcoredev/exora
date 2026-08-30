import type { CurrencyModel } from "@prisma/generated/models";

export type CurrencyResponseDto = Omit<CurrencyModel, "startDate"> & {
	startDate: string;
};

export type CurrencyRateResponseDto = {
	date: string;
	base: CurrencyResponseDto | string | null;
	quote: CurrencyResponseDto | string | null;
	rate: number;
	change?: number | null;
	changePercent?: number | null;
};

export type CurrencyRateDefaultResponseDto = {
	date: string;
	base: string;
	quote: string;
	rate: number;
};
