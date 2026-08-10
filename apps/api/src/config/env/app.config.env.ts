import { registerAs } from "@nestjs/config";
import { appConfigSchema, type appConfigType } from "../interfaces";
import { EnvZodValidate } from "@orbitral/common";

export const appEnv = registerAs<appConfigType>("app", () => {
	const data = EnvZodValidate<appConfigType>(appConfigSchema, process.env);
	return data;
});
