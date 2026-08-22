import { ExchangeRateWidget } from "@/widgets/exchange-rate";
import { HeaderWidget } from "@/widgets/header";

export function HomePage() {
	return (
		<main>
			<HeaderWidget />
			<ExchangeRateWidget />
		</main>
	);
}
