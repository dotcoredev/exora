import type { appConfigType } from "./app.interface";
import type { currencyApiConfigType } from "./currency-api.interface";
import type { PostgresConfigType } from "./postgres.interface";
import type { RedisConfigType } from "./redis.interface";

export interface ConfigsType {
	postgres: PostgresConfigType;
	redis: RedisConfigType;
	currency_api: currencyApiConfigType;
	app: appConfigType;
}
