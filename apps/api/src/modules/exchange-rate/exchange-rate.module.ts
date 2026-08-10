import { Module } from "@nestjs/common";
import { ExchangeRateService } from "./exchange-rate.service";
import { ExchangeRateController } from "./exchange-rate.controller";
import { FrankfurterService } from "./frankfurter.service";
import { HttpModule } from "@nestjs/axios";

/*
	?base=USD&quotes=KZT;
	проверка валют;
	Redis rates:USD:KZT;
	запрос Frankfurter при cache miss;
	популярные комбинации.
*/

@Module({
	imports: [
		HttpModule.register({
			timeout: 35_000,
			maxRedirects: 2,
		}),
	],
	controllers: [ExchangeRateController],
	providers: [ExchangeRateService, FrankfurterService],
})
export class ExchangeRateModule {}
