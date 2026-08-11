import { PrismaService } from "@/infra/prisma/prisma.service";
import { RedisService } from "@/infra/redis/redis.service";
import { Injectable } from "@nestjs/common";
import type { CurrencyResponseDto } from "@/common/dto/responses";
import { KEY_CURRENCY } from "@/common/constants";
import { ConfigService } from "@nestjs/config";
import type { ConfigsType } from "@/config";

@Injectable()
export class CurrencyService {
	private readonly KEY_CURRENCY = KEY_CURRENCY;
	private readonly TTL_CURRENCY!: number;

	constructor(
		private readonly prismaService: PrismaService,
		private readonly redisService: RedisService,
		private readonly configConfig: ConfigService<ConfigsType>,
	) {
		this.TTL_CURRENCY = this.configConfig.getOrThrow("app.ttl_currency", {
			infer: true,
		});
	}

	public async currencies(): Promise<CurrencyResponseDto[]> {
		const cached = await this.redisService.get(this.KEY_CURRENCY);
		if (cached) return JSON.parse(cached);

		const currencies = await this.prismaService.currency.findMany();

		const result: CurrencyResponseDto[] = currencies.map((currency) => ({
			...currency,
			startDate: currency.startDate.toISOString(),
		}));

		await this.redisService.set(
			this.KEY_CURRENCY,
			JSON.stringify(result),
			"EX",
			this.TTL_CURRENCY,
		);
		return result;
	}
}
