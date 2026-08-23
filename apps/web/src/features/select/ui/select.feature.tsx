import { Currency } from "@/entities/currency";
import { Loader, NotFound } from "@/shared/ui";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type SelectProps = {
	label: string;
	options: Currency[];
	loading: boolean;
	value: string | null;
	onValueChange: (value: string) => void;
	id: string;
};

export function Select({
	label,
	options,
	loading,
	value,
	onValueChange,
	id,
}: SelectProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const selectRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const filtered = useMemo(() => {
		const value = query.toLowerCase();

		return options.filter(
			(currency) =>
				currency.isoCode.toLowerCase().includes(value) ||
				currency.name.toLowerCase().includes(value) ||
				currency.ru.toLowerCase().includes(value),
		);
	}, [query, options]);

	return (
		<div className="relative w-full" ref={selectRef}>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-white mb-2"
			>
				{label}
			</label>
			{loading ? (
				<Loader />
			) : (
				<button
					id={id}
					type="button"
					onClick={() => setOpen((prev) => !prev)}
					className="flex cursor-pointer h-14 w-full items-center justify-between rounded-xl border border-slate-800 px-5 text-slate-300"
				>
					{value ? (
						<span className="font-bold text-foreground">
							{value}
						</span>
					) : (
						<span>Выберите валюту</span>
					)}

					<ChevronDown className="size-5" />
				</button>
			)}

			{open && (
				<div className="absolute left-0 top-full z-50 w-full rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-xl">
					<div className="flex items-center gap-2 border-b border-slate-800 px-3">
						<Search className="size-4 text-slate-500" />

						<input
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Поиск валюты..."
							className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
						/>
					</div>

					<div className="mt-2 max-h-64 overflow-y-auto">
						{filtered?.length ? (
							filtered.map((currency) => (
								<button
									key={currency.isoCode}
									type="button"
									onClick={() => {
										onValueChange(currency.isoCode);
										setOpen(false);
										setQuery("");
									}}
									className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-800 cursor-pointer"
								>
									<section className="flex gap-2 justify-center items-center">
										<span className="flex h-10 w-10 rounded-full bg-surface-soft justify-center items-center">
											{currency.symbol}
										</span>
										<span className="font-bold">
											{currency.ru}
										</span>
									</section>
									<span className="text-slate-500">
										{currency.isoCode}
									</span>
								</button>
							))
						) : (
							<NotFound />
						)}
					</div>
				</div>
			)}
		</div>
	);
}
