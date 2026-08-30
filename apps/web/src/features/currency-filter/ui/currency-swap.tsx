import { ArrowLeftRight } from "lucide-react";

type Props = {
	onSwap: () => void;
};

export const CurrencySwap = ({ onSwap }: Props) => {
	return (
		<button
			type="button"
			aria-label="Swap currencies"
			onClick={onSwap}
			className="cursor-pointer flex size-16 items-center justify-center rounded-full border border-primary/35 bg-primary/25 text-white transition hover:bg-primary-hover/30"
		>
			<ArrowLeftRight className="size-7" />
		</button>
	);
};
