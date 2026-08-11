import z from "zod";

export const rateHistoryRequestSchema = z.object({
	base: z
		.string({
			error: "Поле base обязательно",
		})
		.length(3, {
			error: "Поле base должно иметь 3 символа",
		}),
	quote: z
		.string({
			error: "Поле quotes должно быть типа string",
		})
		.length(3, {
			error: "Поле quote должно иметь 3 символа",
		}),
	from: z
		.string()
		.transform((value) => value.toUpperCase())
		.pipe(z.enum(["7D", "1M", "3M", "1Y", "5Y"])),
});

export type RateHistoryRequestDto = z.infer<typeof rateHistoryRequestSchema>;
