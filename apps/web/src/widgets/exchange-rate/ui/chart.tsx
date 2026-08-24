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

const chartData = [
	{ time: "00:00", value: 478.4 },
	{ time: "00:30", value: 477.2 },
	{ time: "01:00", value: 476.5 },
	{ time: "01:30", value: 476.9 },
	{ time: "02:00", value: 476.3 },
	{ time: "02:30", value: 476.4 },
	{ time: "03:00", value: 478.1 },
	{ time: "03:30", value: 478.4 },
	{ time: "04:00", value: 478.7 },
	{ time: "04:30", value: 477.7 },
	{ time: "05:00", value: 478.3 },
	{ time: "05:30", value: 478.2 },
	{ time: "06:00", value: 477.2 },
	{ time: "06:30", value: 476.7 },
	{ time: "07:00", value: 476.8 },
	{ time: "07:30", value: 477.2 },
	{ time: "08:00", value: 476.6 },
	{ time: "08:30", value: 476.9 },
	{ time: "09:00", value: 476.3 },
	{ time: "09:30", value: 476.9 },
	{ time: "10:00", value: 475.4 },
	{ time: "10:30", value: 475.9 },
	{ time: "11:00", value: 476.5 },
	{ time: "11:30", value: 475.7 },
	{ time: "12:00", value: 475.3 },
	{ time: "12:30", value: 473.8 },
	{ time: "13:00", value: 475.2 },
	{ time: "13:30", value: 474.3 },
	{ time: "14:00", value: 473.9 },
	{ time: "14:30", value: 474.8 },
	{ time: "15:00", value: 474.7 },
	{ time: "15:30", value: 475.6 },
	{ time: "16:00", value: 475.2 },
	{ time: "16:30", value: 475.9 },
	{ time: "17:00", value: 475.6 },
	{ time: "17:30", value: 475.3 },
	{ time: "18:00", value: 476.9 },
	{ time: "18:30", value: 477.1 },
	{ time: "19:00", value: 476.6 },
	{ time: "19:30", value: 476.9 },
	{ time: "20:00", value: 477.9 },
	{ time: "20:30", value: 477.7 },
	{ time: "21:00", value: 478.5 },
	{ time: "21:30", value: 478.2 },
	{ time: "22:00", value: 478.8 },
	{ time: "22:30", value: 479.3 },
	{ time: "23:00", value: 479.0 },
	{ time: "23:30", value: 479.4 },
];

export function ChartRate() {
	const gradientId = useId().replaceAll(":", "");

	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart
				data={chartData}
				margin={{
					top: 4,
					right: 8,
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
					formatter={(value) => [`${Number(value).toFixed(2)} KZT`]}
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
