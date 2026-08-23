import { Injectable, Logger } from "@nestjs/common";
import { FrankfurterService } from "./frankfurter.service";
import type { CurrencyRateResponseDto } from "@/common/dto/responses";
import { RedisService } from "@/infra/redis/redis.service";
import { ConfigService } from "@nestjs/config";
import { ConfigsType } from "@/config";
import { RATES_POPULAR } from "@/common/constants";
import { RateHistoryService } from "@/modules/rate-history/rate-history.service";
import { CurrencyCacheService } from "./currency-cache.service";

@Injectable()
export class ExchangeRateService {
	private readonly logger: Logger = new Logger(ExchangeRateService.name);
	private readonly TTL_RATES_POPULAR: number;

	constructor(
		private readonly frankfurterService: FrankfurterService,
		private readonly redisService: RedisService,
		private readonly configService: ConfigService<ConfigsType>,
		private readonly rateHistoryService: RateHistoryService,
		private readonly currencyCacheService: CurrencyCacheService,
	) {
		this.TTL_RATES_POPULAR = this.configService.getOrThrow(
			"app.ttl_rates_popular",
			{
				infer: true,
			},
		);
	}

	public async recentExchange(
		base: string,
	): Promise<CurrencyRateResponseDto[]> {
		const quotes = await this.getPopularQuotes(base, 20);

		const result = await this.rateHistoryService.getRecentRates(
			base,
			quotes,
		);
		return result.map((rate) => ({
			...rate,
			base:
				typeof rate.base === "string"
					? this.currencyCacheService.get(rate.base)
					: rate.base,
			quote:
				typeof rate.quote === "string"
					? this.currencyCacheService.get(rate.quote)
					: rate.quote,
		}));
	}

	private async getPopularQuotes(
		base: string,
		limit = 20,
	): Promise<string[]> {
		return this.redisService.zrevrange(
			`${RATES_POPULAR}:${base}`,
			0,
			limit,
		);
	}

	public async getRate(
		base: string,
		quotes?: string,
	): Promise<CurrencyRateResponseDto[]> {
		const requestedQuotes = [
			...new Set([
				...(quotes ? quotes.split(",").filter((item) => item) : []),
			]),
		].join(",");

		const result = await this.frankfurterService.getRate(
			base,
			requestedQuotes,
		);

		this.incrementPairPopularity(base, requestedQuotes).catch((error) => {
			this.logger.error(
				`Failed to increment popularity ${base}:${requestedQuotes}`,
				error,
			);
		});

		return result;
	}

	private async incrementPairPopularity(
		base: string,
		quotes?: string,
	): Promise<void> {
		const key = `${RATES_POPULAR}:${base}`;

		await this.redisService
			.multi()
			.zincrby(RATES_POPULAR, 1, base)
			.expire(RATES_POPULAR, this.TTL_RATES_POPULAR, "NX")
			.exec();

		if (!quotes?.length) {
			await this.redisService
				.multi()
				.zincrby(key, 1, "all")
				.expire(key, this.TTL_RATES_POPULAR, "NX")
				.exec();

			return;
		}

		const quoteCodes = [
			...new Set(
				quotes
					.split(",")
					.map((quote) => quote.trim())
					.filter(Boolean),
			),
		];

		const multi = this.redisService.multi();

		for (const quote of quoteCodes) {
			multi.zincrby(key, 1, quote);
		}

		multi.expire(key, this.TTL_RATES_POPULAR, "NX");
		await multi.exec();
	}
}
