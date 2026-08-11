import type {
	CurrencyRateDefaultResponseDto,
	CurrencyRateResponseDto,
} from "@/common/dto/responses";
import { ConfigsType } from "@/config";
import { RedisService } from "@/infra/redis/redis.service";
import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { CurrencyCacheService } from "./carrency-cache.service";
import { KEY_RATES } from "@/common/constants";
import { RateHistoryService } from "@/modules/rate-history/rate-history.service";

@Injectable()
export class FrankfurterService {
	private readonly KEY_RATES: string = KEY_RATES;
	private readonly TTL_RATES: number;
	private readonly logger: Logger = new Logger(FrankfurterService.name);

	constructor(
		private readonly httpService: HttpService,
		private readonly redisService: RedisService,
		private readonly currencyCacheService: CurrencyCacheService,
		private readonly configService: ConfigService<ConfigsType>,
		private readonly rateHistoryService: RateHistoryService,
	) {
		this.TTL_RATES = configService.getOrThrow("app.ttl_rates", {
			infer: true,
		});
	}

	public async getRate(
		base: string,
		quotes?: string,
	): Promise<CurrencyRateResponseDto[]> {
		/*---------------------*/
		/*
			Проверяем cache, если есть сразу отдаем, иначе идем дальше
		*/
		const key = `${this.KEY_RATES}:${base}:${quotes?.length ? quotes : "all"}`;
		const cached = await this.redisService.get(key);
		if (cached) return JSON.parse(cached);

		/*---------------------*/
		/*
			Проверяем пару, USD:KZT -> если ключи найдены, продолжаем выполнение, иначе экстендим Invalid currency pair
		*/
		await this.checkCurrency(base, quotes);

		/*---------------------*/
		/*
			Забираем api url из конфиг сервиса и запрашиваем данные курса у провайдера
		*/
		const currency_api = this.configService.getOrThrow(
			"currency_api.currency_api",
			{
				infer: true,
			},
		);
		const res = await this.httpService.get<
			CurrencyRateDefaultResponseDto[]
		>(`${currency_api}/rates`, {
			params: { base, ...(quotes ? { quotes } : {}) },
		});
		const response: { data: CurrencyRateDefaultResponseDto[] } =
			await firstValueFrom(res);

		/*---------------------*/
		/*
			Отправляем данные в сервис rateHistoryService, для хранения истории пар
		*/
		void this.rateHistoryService
			.saveRates(response?.data ?? [])
			.catch((error) => {
				this.logger.error("Failed to save rate history", error);
			});

		/*---------------------*/
		/*
			1. Преобразуем данные, которые отдал нам провайдер
			2. сохраняем в редис в качестве кеша (ttl 4 часа)
			3. отдаем результат клиенту
		*/
		const result: CurrencyRateResponseDto[] =
			Array.isArray(response.data) && response.data.length
				? response.data.map((rate) => ({
						...rate,
						base: this.currencyCacheService.get(rate.base),
						quote: this.currencyCacheService.get(rate.quote),
					}))
				: [];
		await this.redisService.set(
			key,
			JSON.stringify(result),
			"EX",
			this.TTL_RATES,
		);
		return result;
	}

	async checkCurrency(base: string, quotes?: string): Promise<void> {
		const requestedCodes = [
			...new Set([
				base,
				...(quotes ? quotes.split(",").filter((item) => item) : []),
			]),
		];

		const isValid = requestedCodes.every((code) =>
			this.currencyCacheService.has(code),
		);

		if (!isValid) {
			throw new BadRequestException("Invalid currency pair");
		}
	}
}
