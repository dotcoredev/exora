import type { CurrencyModel } from "@prisma/generated/models";

export type CurrencyResponseDto = Omit<CurrencyModel, "startDate"> & {
	startDate: string;
};
