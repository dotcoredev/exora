import { registerAs } from "@nestjs/config";
import {
	currencyApiConfigSchema,
	type currencyApiConfigType,
} from "../interfaces";
import { EnvZodValidate } from "@orbitral/common";

export const currencyApiEnv = registerAs<currencyApiConfigType>(
	"currency_api",
	() => {
		const data = EnvZodValidate<currencyApiConfigType>(
			currencyApiConfigSchema,
			process.env,
		);
		return data;
	},
);
