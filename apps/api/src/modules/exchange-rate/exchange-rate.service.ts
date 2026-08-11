import { Injectable, Logger } from "@nestjs/common";
import { FrankfurterService } from "./frankfurter.service";
import type { CurrencyRateResponseDto } from "@/common/dto/responses";
import { RedisService } from "@/infra/redis/redis.service";
import { ConfigService } from "@nestjs/config";
import { ConfigsType } from "@/config";
import { RATES_POPULAR } from "@/common/constants";

@Injectable()
export class ExchangeRateService {
	private readonly logger: Logger = new Logger(ExchangeRateService.name);
	private readonly TTL_RATES_POPULAR: number;

	constructor(
		private readonly frankfurterService: FrankfurterService,
		private readonly redisService: RedisService,
		private readonly configService: ConfigService<ConfigsType>,
	) {
		this.TTL_RATES_POPULAR = this.configService.getOrThrow(
			"app.ttl_rates_popular",
			{
				infer: true,
			},
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
		const pair = `${base}:${quotes?.length ? quotes : "all"}`;

		await this.redisService
			.multi()
			.zincrby(RATES_POPULAR, 1, pair)
			.expire(RATES_POPULAR, this.TTL_RATES_POPULAR, "NX")
			.exec();
	}
}
