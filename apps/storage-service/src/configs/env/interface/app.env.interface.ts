import { z } from "zod";

export const appConfigSchema = z
	.object({
		HOST: z.string(),
		PORT: z.coerce.number(),
	})
	.transform((data) => ({
		host: data.HOST,
		port: data.PORT,
	}));

export type AppConfigType = z.infer<typeof appConfigSchema>;
