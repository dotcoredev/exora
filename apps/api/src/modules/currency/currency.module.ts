import { Module } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { CurrencyController } from "./currency.controller";
import { ExchangeRateModule } from "@/modules/exchange-rate/exchange-rate.module";

/*
	список для фильтра;
	поиск валют;
	получение информации о конкретной валюте.
*/

@Module({
	imports: [ExchangeRateModule],
	controllers: [CurrencyController],
	providers: [CurrencyService],
})
export class CurrencyModule {}
