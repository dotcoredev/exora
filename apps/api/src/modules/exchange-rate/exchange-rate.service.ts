import { Injectable, Logger } from "@nestjs/common";
import { FrankfurterService } from "./frankfurter.service";
import type { CurrencyResponseDto } from "@/common/dto/responses";
import { RedisService } from "@/infra/redis/redis.service";
import { RATES_POPULAR } from "./constants/rates.constants";
import { ConfigService } from "@nestjs/config";
import { ConfigsType } from "@/config";

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
		quotes: string | null,
	): Promise<CurrencyResponseDto[]> {
		const result = await this.frankfurterService.getRate(base, quotes);
		this.incrementPairPopularity(base, quotes).catch((error) => {
			this.logger.error(
				`Failed to increment popularity ${base}:${quotes}`,
				error,
			);
		});
		return result;
	}

	private async incrementPairPopularity(
		base: string,
		quotes: string | null,
	): Promise<void> {
		const pair = `${base}:${quotes ?? "all"}`;

		await this.redisService
			.multi()
			.zincrby(RATES_POPULAR, 1, pair)
			.expire(RATES_POPULAR, this.TTL_RATES_POPULAR, "NX")
			.exec();
	}
}
