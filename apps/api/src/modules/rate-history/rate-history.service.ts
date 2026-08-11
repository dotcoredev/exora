import type { CurrencyRateDefaultResponseDto } from "@/common/dto/responses";
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
}
