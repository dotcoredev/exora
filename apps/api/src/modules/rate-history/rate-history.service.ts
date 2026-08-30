import type {
	CurrencyRateDefaultResponseDto,
	CurrencyRateResponseDto,
} from "@/common/dto/responses";
import { PrismaService } from "@/infra/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import type { RateHistoryPeriod } from "./interfaces";

@Injectable()
export class RateHistoryService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getHistory(
		base: string,
		quote: string,
		period: RateHistoryPeriod,
	) {
		const from = this.getFromDate(period);

		return this.prismaService.rateHistory.findMany({
			where: {
				base: base,
				quote: quote,
				date: {
					gte: from,
				},
			},
			orderBy: {
				date: "asc",
			},
			select: {
				date: true,
				rate: true,
				base: true,
				quote: true,
			},
		});
	}

	private getFromDate(period: RateHistoryPeriod): Date {
		const from = new Date();

		from.setUTCHours(0, 0, 0, 0);

		switch (period) {
			case "7D":
				from.setUTCDate(from.getUTCDate() - 7);
				break;

			case "1M":
				from.setUTCMonth(from.getUTCMonth() - 1);
				break;

			case "3M":
				from.setUTCMonth(from.getUTCMonth() - 3);
				break;

			case "1Y":
				from.setUTCFullYear(from.getUTCFullYear() - 1);
				break;

			case "5Y":
				from.setUTCFullYear(from.getUTCFullYear() - 5);
				break;
		}

		return from;
	}

	public async saveRates(
		rates: CurrencyRateDefaultResponseDto[],
	): Promise<void> {
		await Promise.all(
			rates.map((rate) => {
				const date = new Date(`${rate.date}T00:00:00.000Z`);

				return this.prismaService.rateHistory.upsert({
					where: {
						base_quote_date: {
							base: rate.base,
							quote: rate.quote,
							date,
						},
					},
					create: {
						base: rate.base,
						quote: rate.quote,
						rate: rate.rate,
						date,
					},
					update: {
						rate: rate.rate,
					},
				});
			}),
		);
	}

	public async getRecentRates(
		base: string,
		quotes: string[],
	): Promise<CurrencyRateResponseDto[]> {
		if (!quotes.length) {
			return [];
		}

		const latest = await this.prismaService.rateHistory.findFirst({
			where: {
				base,
				quote: {
					in: quotes,
				},
			},
			orderBy: {
				date: "desc",
			},
			select: {
				date: true,
			},
		});

		if (!latest) {
			return [];
		}

		const previousRates = await this.prismaService.rateHistory.findMany({
			where: {
				base,
				quote: {
					in: quotes,
				},
				date: {
					lt: latest.date,
				},
			},
			orderBy: {
				date: "desc",
			},
			distinct: ["quote"],
			select: {
				quote: true,
				rate: true,
			},
		});

		const currentRates = await this.prismaService.rateHistory.findMany({
			where: {
				base,
				quote: {
					in: quotes,
				},
				date: latest.date,
			},
			select: {
				base: true,
				quote: true,
				rate: true,
				date: true,
			},
		});

		const currentMap = new Map(
			currentRates.map((rate) => [rate.quote, rate]),
		);

		if (!previousRates.length) {
			return quotes
				.map((quote) => currentMap.get(quote))
				.filter((rate) => rate !== undefined)
				.map((rate) => ({
					...rate,
					date: rate.date.toISOString(),
					rate: Number(rate.rate),
					change: null,
					changePercent: null,
				}));
		}

		const previousMap = new Map(
			previousRates.map((rate) => [rate.quote, Number(rate.rate)]),
		);

		return quotes
			.map((quote) => currentMap.get(quote))
			.filter((rate) => rate !== undefined)
			.map((rate) => {
				const currentRate = Number(rate.rate);
				const previousRate = previousMap.get(rate.quote);

				if (previousRate === undefined) {
					return {
						...rate,
						date: rate.date.toISOString(),
						rate: currentRate,
						change: null,
						changePercent: null,
					};
				}

				const change = currentRate - previousRate;
				const changePercent = (change / previousRate) * 100;

				return {
					...rate,
					date: rate.date.toISOString(),
					rate: currentRate,
					change,
					changePercent,
				};
			});
	}
}
