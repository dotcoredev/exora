"use client";

import { useCurrencies } from "@/entities/currency";
import { Select } from "@/features/select";
import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";

type CurrencyPair = {
	from: string | null;
	to: string | null;
};

export function ExchangeRateWidget() {
	const { data, isLoading } = useCurrencies();

	const [pair, setPair] = useState<CurrencyPair>({
		from: null,
		to: null,
	});

	function handleSwap() {
		setPair(({ from, to }) => ({
			from: to,
			to: from,
		}));
	}

	return (
		<div className="grid grid-cols-[1fr_auto_1fr] items-end gap-8">
			<div className="space-y-2">
				<Select
					loading={isLoading}
					options={data ?? []}
					label="From"
					id="currency-from"
					value={pair.from}
					onValueChange={(from) =>
						setPair((current) => ({ ...current, from }))
					}
				/>
			</div>

			<button
				type="button"
				disabled={!pair.from || !pair.to}
				aria-label="Swap currencies"
				onClick={handleSwap}
				className="cursor-pointer flex size-16 items-center justify-center rounded-full border border-primary/35 bg-primary/25 text-white transition hover:bg-primary-hover/30"
			>
				<ArrowLeftRight className="size-7" />
			</button>

			<div className="space-y-2">
				<Select
					loading={isLoading}
					options={data ?? []}
					label="To"
					id="currency-to"
					value={pair.to}
					onValueChange={(to) =>
						setPair((current) => ({ ...current, to }))
					}
				/>
			</div>
		</div>
	);
}
