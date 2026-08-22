import { z } from "zod";

export const appConfigSchema = z
	.object({
		PORT: z.coerce.number().int().min(1).max(65535).default(4001),
		TTL_RATES_POPULAR: z.coerce.number().int().default(604800),
		TTL_RATES: z.coerce.number().int().default(14400),
		TTL_CURRENCY: z.coerce.number().int().default(72000),
		ORIGINS: z.string(),
	})
	.transform((env) => ({
		port: env.PORT,
		ttl_rates_popular: env.TTL_RATES_POPULAR,
		ttl_rates: env.TTL_RATES,
		ttl_currency: env.TTL_CURRENCY,
		origins: env.ORIGINS,
	}));

export type appConfigType = z.infer<typeof appConfigSchema>;
