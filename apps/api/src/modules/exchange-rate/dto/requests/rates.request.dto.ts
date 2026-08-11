import z from "zod";

export const RatesRequestSchema = z.object({
	base: z
		.string({
			error: "Поле base обязательно",
		})
		.length(3, {
			error: "Поле base должно иметь 3 символа",
		}),
	quotes: z
		.string({
			error: "Поле quotes должно быть типа string",
		})
		.min(3, {
			error: "Поле quotes должно иметь минимум 3 символа",
		})
		.optional(),
});

export type RatesRequestDto = z.infer<typeof RatesRequestSchema>;
