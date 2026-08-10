import { PrismaService } from "@/infra/prisma/prisma.service";
import { RedisService } from "@/infra/redis/redis.service";
import { Injectable } from "@nestjs/common";
import type { CurrencyResponseDto } from "@/common/dto/responses";

@Injectable()
export class CurrencyService {
	private readonly KEY_CURRENCY: string = "rates:currencies";
	private readonly TTL_CURRENCY: number = 72000;

	constructor(
		private readonly prismaService: PrismaService,
		private readonly redisService: RedisService,
	) {}

	public async get(): Promise<CurrencyResponseDto[]> {
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
