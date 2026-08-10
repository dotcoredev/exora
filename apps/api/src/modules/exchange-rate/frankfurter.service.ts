import type { CurrencyResponseDto } from "@/common/dto/responses";
import { ConfigsType } from "@/config";
import { RedisService } from "@/infra/redis/redis.service";
import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { KEY_RATES } from "./constants/rates.constants";
import { PrismaService } from "@/infra/prisma/prisma.service";

@Injectable()
export class FrankfurterService {
	private readonly KEY_RATES: string = KEY_RATES;
	private readonly TTL_RATES: number;

	constructor(
		private readonly httpService: HttpService,
		private readonly redisService: RedisService,
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService<ConfigsType>,
	) {
		this.TTL_RATES = configService.getOrThrow("app.ttl_rates", {
			infer: true,
		});
	}

	public async getRate(
		base: string,
		quotes: string | null,
	): Promise<CurrencyResponseDto[]> {
		const key = `${this.KEY_RATES}:${base}:${quotes ?? "all"}`;
		const cached = await this.redisService.get(key);
		if (cached) return JSON.parse(cached);

		await this.checkCurrency(base, quotes);

		const api_url = this.configService.getOrThrow(
			"currency_api.currency_api",
			{
				infer: true,
			},
		);
		const res = await this.httpService.get<CurrencyResponseDto[]>(
			`${api_url}/rates`,
			{
				params: { base, ...(quotes ? { quotes } : {}) },
			},
		);

		const response = await firstValueFrom(res);
		const result: CurrencyResponseDto[] = response.data;
		await this.redisService.set(
			key,
			JSON.stringify(result),
			"EX",
			this.TTL_RATES,
		);
		return result;
	}

	async checkCurrency(base: string, quotes: string | null): Promise<void> {
		const requestedCodes = [
			...new Set([base, ...(quotes ? [quotes] : [])]),
		];

		const currencies = await this.prismaService.currency.findMany({
			where: {
				isoCode: {
					in: requestedCodes,
				},
			},
			select: {
				isoCode: true,
			},
		});

		if (currencies.length !== requestedCodes.length) {
			throw new BadRequestException("Invalid currency pair");
		}
	}
}
