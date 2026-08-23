"use client";

import { usePopularCurrencies } from "@/entities/currency";
import { Badge, Loader, NotFound } from "@/shared/ui";

export function PopularCurrencies() {
	const { data, isLoading } = usePopularCurrencies();

	return (
		<section className="flex flex-col gap-y-2">
			<h5 className="text-foreground/75 font-sans">Популярное</h5>
			<section className="flex flex-wrap gap-3">
				{isLoading ? (
					<Loader />
				) : data?.length ? (
					data.map((currency) => (
						<Badge
							key={currency.id}
							text={`${currency.isoCode} - ${currency.ru}`}
						/>
					))
				) : (
					<NotFound />
				)}
			</section>
		</section>
	);
}
