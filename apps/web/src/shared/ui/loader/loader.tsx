import { PuffLoader } from "react-spinners";

export function Loader() {
	return (
		<section className="w-full bg-primary/15 flex justify-center items-center rounded-2xl h-14">
			<PuffLoader color="var(--color-primary)" size={30} />
		</section>
	);
}
