import type { CurrencyModel } from "@prisma/generated/models";

export type CurrencyResponseDto = Omit<CurrencyModel, "startDate"> & {
	startDate: string;
};

export type CurrencyRateResponseDto = {
	date: string;
	base: CurrencyResponseDto | null;
	quote: CurrencyResponseDto | null;
	rate: number;
};

export type CurrencyRateDefaultResponseDto = {
	date: string;
	base: string;
	quote: string;
	rate: number;
};
