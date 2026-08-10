import { Module } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { CurrencyController } from "./currency.controller";

/*
	список для фильтра;
	поиск валют;
	получение информации о конкретной валюте.
*/

@Module({
	controllers: [CurrencyController],
	providers: [CurrencyService],
})
export class CurrencyModule {}
