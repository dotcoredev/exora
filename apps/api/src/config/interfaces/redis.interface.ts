import { z } from "zod";

export const redisConfigSchema = z
	.object({
		REDIS_USER: z.string(),
		REDIS_PASSWORD: z.string(),
		REDIS_HOST: z.string(),
		REDIS_PORT: z.coerce.number().min(5000).max(7400),
		maxRetriesPerRequest: z.number().default(5), // maxRetriesPerRequest flag to control the maximum number of retries per request
		enableOfflineQueue: z.boolean().default(true), // enableOfflineQueue flag to control whether commands are queued while the connection is down
	})
	.transform((env) => ({
		username: env.REDIS_USER,
		password: env.REDIS_PASSWORD,
		host: env.REDIS_HOST,
		port: env.REDIS_PORT,
		maxRetriesPerRequest: env.maxRetriesPerRequest,
		enableOfflineQueue: env.enableOfflineQueue,
	}));

export type RedisConfigType = z.infer<typeof redisConfigSchema>;
