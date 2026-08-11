import { Module } from "@nestjs/common";
import { ExchangeRateService } from "./exchange-rate.service";
import { ExchangeRateController } from "./exchange-rate.controller";
import { FrankfurterService } from "./frankfurter.service";
import { HttpModule } from "@nestjs/axios";
import { CurrencyCacheService } from "./carrency-cache.service";
import { ScheduleModule } from "@nestjs/schedule";
import { RateHistoryModule } from "@/modules/rate-history/rate-history.module";

/*
	?base=USD&quotes=KZT;
	проверка валют;
	Redis rates:USD:KZT;
	запрос Frankfurter при cache miss;
	популярные комбинации.
*/

@Module({
	imports: [
		ScheduleModule.forRoot(),
		HttpModule.register({
			timeout: 35_000,
			maxRedirects: 2,
		}),
		RateHistoryModule,
	],
	controllers: [ExchangeRateController],
	providers: [ExchangeRateService, FrankfurterService, CurrencyCacheService],
})
export class ExchangeRateModule {}
