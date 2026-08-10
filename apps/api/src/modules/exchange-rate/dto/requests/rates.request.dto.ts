import z from "zod";

const CurrencyCodeSchema = z
	.string({
		error: "Поле base обязательно",
	})
	.trim()
	.regex(/^[A-Za-z]{3}$/, {
		error: "Код валюты должен содержать три латинские буквы",
	})
	.transform((value) => value.toUpperCase());

export const RatesRequestSchema = z.object({
	base: CurrencyCodeSchema,
	quotes: CurrencyCodeSchema.optional(),
});

export type RatesRequestDto = z.infer<typeof RatesRequestSchema>;
