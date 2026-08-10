import "dotenv/config";
import currencies from "./data/currencies_ru.json";
import type { CurrencyCreateInput } from "./generated/models";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URI!,
});

const prisma = new PrismaClient({
	adapter,
});

async function seedCurrencies() {
	const data: CurrencyCreateInput[] = currencies.map((currency) => ({
		isoCode: currency.iso_code,
		isoNumeric: currency.iso_numeric || null,
		name: currency.name,
		ru: currency.ru,
		symbol: currency.symbol,
		startDate: new Date(`${currency.start_date}T00:00:00.000Z`),
	}));

	await prisma.currency.createMany({
		data,
		skipDuplicates: true,
	});

	return "success seed";
}

seedCurrencies()
	.then(console.log)
	.catch(console.error)
	.finally(async () => {
		await prisma.$disconnect();
	});
