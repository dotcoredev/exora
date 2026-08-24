type Props = {
	text?: string;
};

export function NotFound({ text = "Нет информации" }: Props) {
	return (
		<section className="w-full bg-background/35 rounded-2xl my-5 flex justify-center items-center py-5">
			<p className="text-blue-100/25">{text}</p>
		</section>
	);
}
