"use client";

import { useCurrencies } from "@/entities/currency";
import { Select } from "@/features/select";
import { ArrowLeftRight } from "lucide-react";

export function ExchangeRateWidget() {
	const { data, isLoading } = useCurrencies();

	return (
		<div className="bg-surface-soft p-7 border border-primary/17 rounded-2xl grid grid-cols-[1fr_auto_1fr] items-end gap-8">
			<div className="space-y-2">
				<Select
					loading={isLoading}
					options={data ?? []}
					symbol="From"
				/>
			</div>

			<button
				type="button"
				aria-label="Swap currencies"
				className="cursor-pointer flex size-16 items-center justify-center rounded-full border border-violet-500 bg-primary text-white transition hover:bg-primary-hover rotate-90"
			>
				<ArrowLeftRight className="size-7 rotate-90" />
			</button>

			<div className="space-y-2">
				<Select loading={isLoading} options={data ?? []} symbol="To" />
			</div>
		</div>
	);
}
