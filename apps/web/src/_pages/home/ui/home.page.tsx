"use client";

import { ExchangeFilterWidget } from "@/widgets/exchange-filter";
import { ExchangeRateChart } from "@/widgets/exchange-rate";
import { HeaderWidget } from "@/widgets/header";
import { PopularCurrencies } from "@/widgets/popular-currencies";

export function HomePage() {
	return (
		<main>
			<HeaderWidget />
			<section className="flex flex-col bg-surface-soft p-7 border border-primary/17 rounded-2xl gap-4">
				<ExchangeFilterWidget />
				<PopularCurrencies />
				<ExchangeRateChart />
			</section>
		</main>
	);
}
