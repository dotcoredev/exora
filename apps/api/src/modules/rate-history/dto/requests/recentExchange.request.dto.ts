import z from "zod";

export const recentExchangeRequestSchema = z.object({
	base: z
		.string({
			error: "Поле base обязательно",
		})
		.length(3, {
			error: "Поле base должно иметь 3 символа",
		}),
});

export type RecentExchangeRequestDto = z.infer<
	typeof recentExchangeRequestSchema
>;
