"use client";

import { useCurrencies } from "@/entities/currency";
import { Select } from "./currency-select";
import { CurrencySwap } from "./currency-swap";
import { useCurrencyFilterStore } from "../model/store";
import { useShallow } from "zustand/shallow";

export function ExchangeRateFilter() {
	const { data, isLoading } = useCurrencies();
	const { from, to, setFrom, setTo, swap } = useCurrencyFilterStore(
		useShallow((state) => ({
			from: state.from,
			to: state.to,
			setFrom: state.setFrom,
			setTo: state.setTo,
			swap: state.swap,
		})),
	);

	return (
		<div className="w-full grid lg:grid-cols-[1fr_auto_1fr] items-end gap-8">
			<div className="space-y-2 w-full">
				<Select
					loading={isLoading}
					options={data ?? []}
					label="From"
					id="currency-from"
					value={from}
					onValueChange={(from) => setFrom(from)}
				/>
			</div>

			<CurrencySwap onSwap={swap} />

			<div className="space-y-2 w-full">
				<Select
					loading={isLoading}
					options={data ?? []}
					label="To"
					id="currency-to"
					value={to}
					onValueChange={(to) => setTo(to)}
				/>
			</div>
		</div>
	);
}
