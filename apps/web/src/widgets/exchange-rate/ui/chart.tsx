import { useRecentRates } from "@/entities/currency";
import { useId } from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

type Props = {
	from: string | null;
	to: string | null;
};

export function ChartRate({ from, to }: Props) {
	const gradientId = useId().replaceAll(":", "");
	const { data } = useRecentRates(from, to);

	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart
				data={data}
				margin={{
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
				}}
			>
				<defs>
					<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
						<stop
							offset="0%"
							stopColor="var(--color-primary)"
							stopOpacity={0.3}
						/>

						<stop
							offset="100%"
							stopColor="var(--color-primary)"
							stopOpacity={0}
						/>
					</linearGradient>
				</defs>

				<CartesianGrid
					stroke="var(--color-border)"
					strokeOpacity={0.4}
				/>

				<XAxis
					dataKey="time"
					axisLine={false}
					tickLine={false}
					minTickGap={40}
					tickMargin={8}
					tick={{
						fill: "var(--color-muted)",
						fontSize: 12,
					}}
				/>

				<YAxis
					axisLine={false}
					tickLine={false}
					width={58}
					tickCount={5}
					domain={["auto", "auto"]}
					tick={{
						fill: "var(--color-muted)",
						fontSize: 12,
					}}
					tickFormatter={(value: number) => value.toFixed(2)}
				/>

				<Tooltip
					formatter={(value) => [`${Number(value).toFixed(2)} ${to}`]}
					contentStyle={{
						background: "var(--color-surface-soft)",
						border: "1px solid var(--color-border)",
						borderRadius: "var(--radius-control)",
					}}
					labelStyle={{
						color: "var(--color-muted)",
					}}
				/>

				<Area
					type="basis"
					dataKey="value"
					stroke="var(--color-primary)"
					strokeWidth={1.5}
					fill={`url(#${gradientId})`}
					dot={false}
					activeDot={{ r: 3 }}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
