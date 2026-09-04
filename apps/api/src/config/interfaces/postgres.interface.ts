import { z } from "zod";

export const postgresConfigSchema = z
	.object({
		DATABASE_USER: z.string(),
		DATABASE_PASSWORD: z.string(),
		DATABASE_HOST: z.string(),
		DATABASE_PORT: z.coerce.number().min(5000).max(7400),
		DATABASE_NAME: z.string(),
		DATABASE_URI: z.string({
			error: 'DATABASE_URL is required and must be a valid DB connection string (e.g., "postgresql://user:password@host:port/database")',
		}),
	})
	.transform((env) => ({
		user: env.DATABASE_USER,
		password: env.DATABASE_PASSWORD,
		host: env.DATABASE_HOST,
		port: env.DATABASE_PORT,
		database: env.DATABASE_NAME,
		uri: env.DATABASE_URI,
	}));

export type PostgresConfigType = z.infer<typeof postgresConfigSchema>;
