"use client";

import { Info } from "lucide-react";
import { ChartRate } from "./chart";
import { ChartPeriod } from "./chart-period";

type ExchangeRateChartProps = {
	base: string;

	rate: number;
	change: number;
	changePercent: number;

	updatedAt: string;
};

export function ExchangeRateChart({
	base,
	rate,
	change,
	changePercent,
	updatedAt,
}: ExchangeRateChartProps) {
	const isPositive = change >= 0;

	return (
		<section className="overflow-hidden rounded-card border border-border bg-surface">
			<div className="grid gap-6 p-6 lg:grid-cols-[360px_minmax(0,1fr)]">
				<div>
					<p className="text-sm text-muted">Exchange rate (latest)</p>

					<h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground">
						1 {base} = {rate.toFixed(2)} KZT
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

						<span className="text-foreground">today</span>
					</div>

					<p className="mt-1 text-sm text-muted">{updatedAt}</p>
				</div>

				<div className="min-w-0">
					<div className="h-40 w-full">
						<ChartRate />
					</div>
				</div>
			</div>

			<footer className="flex items-center gap-2 border-t border-border px-6 py-3 text-sm text-muted">
				<Info className="size-4 shrink-0" />

				<p>Rates are updated automatically. All times shown in UTC.</p>
			</footer>
		</section>
	);
}
