type CurrencyModel = {
	symbol: string;
	name: string;
	id: string;
	isoCode: string;
	isoNumeric: string | null;
	ru: string;
	startDate: Date;
};

export type Currency = Omit<CurrencyModel, "startDate"> & {
	startDate: string;
};

export type CurrencyRate = {
	date: string;
	base: Currency | string | null;
	quote: Currency | string | null;
	rate: number;
	change?: number | null;
	changePercent?: number | null;
};

export type RecentRate = {
	date: string;
	rate: number;
	base: string;
	quote: string;
};
