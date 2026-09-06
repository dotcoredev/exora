import { registerAs } from "@nestjs/config";
import { EnvZodValidate } from "@orbitral/common";
import {
	appConfigSchema,
	type AppConfigType,
} from "./interface/app.env.interface.js";

export const appEnv = registerAs<AppConfigType>("app", () => {
	const data = EnvZodValidate<AppConfigType>(appConfigSchema, process.env);
	return data;
});
