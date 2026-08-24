type BadgeProps = {
	text: string;
	onSelect?: () => void;
};

export function Badge({ text, onSelect }: BadgeProps) {
	return (
		<button
			type="button"
			onClick={onSelect}
			className="transition-colors duration-200 bg-primary/10 hover:bg-primary/30 border-foreground/10 border hover:border-foreground/15 text-foreground px-2 py-0.5 rounded-md cursor-pointer text-sm"
		>
			{text}
		</button>
	);
}
