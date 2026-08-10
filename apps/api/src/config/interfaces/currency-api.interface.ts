import { z } from "zod";

export const currencyApiConfigSchema = z
	.object({
		CURRENCY_API: z.url(),
	})
	.transform((env) => ({
		currency_api: env.CURRENCY_API,
	}));

export type currencyApiConfigType = z.infer<typeof currencyApiConfigSchema>;
