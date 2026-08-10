import { registerAs } from "@nestjs/config";
import { type RedisConfigType, redisConfigSchema } from "../interfaces";
import { EnvZodValidate } from "@orbitral/common";

export const redisEnv = registerAs<RedisConfigType>("redis", () => {
	const data = EnvZodValidate<RedisConfigType>(
		redisConfigSchema,
		process.env,
	);
	return data;
});
