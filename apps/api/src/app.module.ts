import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { appEnv, currencyApiEnv, databaseEnv, redisEnv } from "@/config";
import { PrismaModule } from "@/infra/prisma/prisma.module";
import { RedisModule } from "@/infra/redis/redis.module";
import { CurrencyModule } from "./modules/currency/currency.module";
import { ExchangeRateModule } from "./modules/exchange-rate/exchange-rate.module";
import { RateHistoryModule } from "./modules/rate-history/rate-history.module";
import { AppThrottlerModule } from "@/infra/throttler/throttler.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseEnv, redisEnv, currencyApiEnv, appEnv],
		}),
		AppThrottlerModule,
		PrismaModule,
		RedisModule,
		CurrencyModule,
		ExchangeRateModule,
		RateHistoryModule,
	],
})
export class AppModule {}
