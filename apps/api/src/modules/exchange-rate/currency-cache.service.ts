import type { CurrencyResponseDto } from "@/common/dto/responses";
import { PrismaService } from "@/infra/prisma/prisma.service";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class CurrencyCacheService implements OnModuleInit {
	private currencies: Map<string, CurrencyResponseDto> = new Map<
		string,
		CurrencyResponseDto
	>();

	constructor(private readonly prisma: PrismaService) {}

	async onModuleInit() {
		console.log("onModuleInit CurrencyCacheService");
		await this.refresh();
	}

	@Cron("0 0 3 * * *")
	private async refresh(): Promise<void> {
		const currencies = await this.prisma.currency.findMany();

		const newCache = new Map(
			currencies.map((currency) => {
				const dto: CurrencyResponseDto = {
					...currency,
					startDate: currency.startDate.toISOString(),
				};

				return [currency.isoCode, dto];
			}),
		);

		this.currencies = newCache;
	}

	public get(code: string): CurrencyResponseDto | null {
		const currency = this.currencies.get(code);
		return currency ?? null;
	}

	public has(code: string): boolean {
		return this.currencies.has(code);
	}
}
