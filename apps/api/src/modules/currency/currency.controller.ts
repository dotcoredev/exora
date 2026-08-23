import { Controller, Get } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import type { CurrencyResponseDto } from "@/common/dto/responses";

@Controller("currency")
export class CurrencyController {
	constructor(private readonly currencyService: CurrencyService) {}

	@Get("/")
	async currencies(): Promise<CurrencyResponseDto[]> {
		return this.currencyService.currencies();
	}

	@Get("/popular")
	async popularCurrencies(): Promise<CurrencyResponseDto[]> {
		return this.currencyService.popularCurrencies();
	}
}
