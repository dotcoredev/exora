import { registerAs } from "@nestjs/config";
import { postgresConfigSchema, type PostgresConfigType } from "../interfaces";
import { EnvZodValidate } from "@orbitral/common";

export const databaseEnv = registerAs<PostgresConfigType>("postgres", () => {
	const data = EnvZodValidate<PostgresConfigType>(
		postgresConfigSchema,
		process.env,
	);
	return data;
});
