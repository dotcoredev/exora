export function PopularCurrencies() {
	return (
		<section className="flex flex-col gap-y-2">
			<h5 className="text-foreground/75 font-sans">Популярное</h5>
			<section className="flex flex-wrap gap-3">
				<span className="transition-colors duration-200 bg-primary/10 hover:bg-primary/70 border-foreground/10 border hover:border-foreground/30 text-foreground px-2 py-0.5 rounded-md cursor-pointer text-sm">
					USD
				</span>
				<span className="transition-colors duration-200 bg-primary/10 hover:bg-primary/70 border-foreground/10 border hover:border-foreground/30 text-foreground px-2 py-0.5 rounded-md cursor-pointer text-sm">
					EUR
				</span>
				<span className="transition-colors duration-200 bg-primary/10 hover:bg-primary/70 border-foreground/10 border hover:border-foreground/30 text-foreground px-2 py-0.5 rounded-md cursor-pointer text-sm">
					RUB
				</span>
				<span className="transition-colors duration-200 bg-primary/10 hover:bg-primary/70 border-foreground/10 border hover:border-foreground/30 text-foreground px-2 py-0.5 rounded-md cursor-pointer text-sm">
					KZT
				</span>
			</section>
		</section>
	);
}
