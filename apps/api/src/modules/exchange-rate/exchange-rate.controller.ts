import { Controller, Get, Query } from "@nestjs/common";
import { ExchangeRateService } from "./exchange-rate.service";
import type { CurrencyRateResponseDto } from "@/common/dto/responses";
import { ZodValidationPipe } from "@/common/pipes";
import { type RatesRequestDto, RatesRequestSchema } from "./dto/requests";
import {
	type RecentExchangeRequestDto,
	recentExchangeRequestSchema,
} from "../rate-history/dto/requests/recentExchange.request.dto";

@Controller("rates")
export class ExchangeRateController {
	constructor(private readonly exchangeRateService: ExchangeRateService) {}

	@Get("/")
	public async getRate(
		@Query(new ZodValidationPipe(RatesRequestSchema))
		query: RatesRequestDto,
	): Promise<CurrencyRateResponseDto[]> {
		return this.exchangeRateService.getRate(query.base, query?.quotes);
	}

	@Get("/recent-exchange")
	async recentExchangeRates(
		@Query(new ZodValidationPipe(recentExchangeRequestSchema))
		query: RecentExchangeRequestDto,
	): Promise<CurrencyRateResponseDto[]> {
		return this.exchangeRateService.recentExchange(query.base);
	}
}
