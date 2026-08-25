"use client";

import { Info } from "lucide-react";
import { ChartRate } from "./chart";
import { useCurrencyFilterStore } from "@/features/currency-filter";
import { useExchangeRate } from "@/entities/currency";
import { Loader, NotFound } from "@/shared/ui";

export function ExchangeRateChart() {
	const from = useCurrencyFilterStore((state) => state.from);
	const to = useCurrencyFilterStore((state) => state.to);

	const { data, isFetching } = useExchangeRate(from, to);
	const [rate] = data ?? [];

	if (!rate) {
		return <NotFound text="Выберите пару валют для отображения курса" />;
	}

	const baseCode =
		typeof rate.base === "string" ? rate.base : (rate.base?.isoCode ?? "-");

	const quoteCode =
		typeof rate.quote === "string"
			? rate.quote
			: (rate.quote?.isoCode ?? "-");

	const change = rate.change ?? 0;
	const changePercent = rate.changePercent ?? 0;
	const isPositive = change >= 0;

	return (
		<section className="relative overflow-hidden rounded-card border border-border bg-surface">
			{isFetching && (
				<div className="absolute opacity-0.1 top-0 left-0 z-20 w-full h-full bg-surface/85" />
			)}
			<div className="grid gap-6 p-6 lg:grid-cols-[360px_minmax(0,1fr)]">
				<div>
					<p className="text-sm text-muted">Курс валюты</p>

					<h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground">
						1 {baseCode} = {rate.rate.toFixed(2)} {quoteCode}
					</h2>

					<div className="mt-3 flex items-center gap-1.5 text-base">
						<span
							className={
								isPositive ? "text-success" : "text-danger"
							}
						>
							{isPositive ? "+" : ""}
							{change.toFixed(2)} ({isPositive ? "+" : ""}
							{changePercent.toFixed(2)}%)
						</span>

						<span className="text-foreground">сегодня</span>
					</div>

					<p className="mt-1 text-sm text-muted">{rate?.date}</p>
				</div>

				<div className="min-w-0">
					<div className="h-40 w-full">
						<ChartRate />
					</div>
				</div>
			</div>

			<footer className="flex items-center gap-2 border-t border-border px-6 py-3 text-sm text-muted">
				<Info className="size-4 shrink-0" />

				<p>
					Курс обновляется автоматически. Все время указано в формате
					UTC.
				</p>
			</footer>
		</section>
	);
}
