import { useState } from "react";

const periods = ["7D", "1M", "1Y", "5Y"] as const;
type Period = (typeof periods)[number];
const PERIODS: Period[] = ["7D", "1M", "1Y", "5Y"];

export function ChartPeriod() {
	const [period, setPeriod] = useState<Period>("7D");

	return (
		<div className="flex rounded-control border border-border bg-surface-soft p-0.5">
			{PERIODS.map((item) => {
				const active = period === item;

				return (
					<button
						key={item}
						type="button"
						onClick={() => setPeriod(item)}
						className={[
							"min-w-14 rounded-lg px-4 py-1.5 cursor-pointer",
							"text-sm transition-colors",
							active
								? "bg-primary text-white"
								: "text-muted hover:text-foreground",
						].join(" ")}
					>
						{item}
					</button>
				);
			})}
		</div>
	);
}
