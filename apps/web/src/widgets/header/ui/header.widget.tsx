import Link from "next/link";
import { Star, ArrowUpDown, Clock, BadgeDollarSign } from "lucide-react";

export function HeaderWidget() {
	return (
		<header className="w-full py-5">
			<div className="flex items-center justify-between">
				<Link href="/" className="flex items-center gap-3">
					<div className="flex size-11 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
						<BadgeDollarSign />
					</div>

					<div>
						<h1 className="text-lg font-semibold text-foreground">
							Currency Explorer
						</h1>

						<p className="text-sm text-muted">
							Explore world currencies
						</p>
					</div>
				</Link>

				<nav className="flex items-center gap-8">
					<Link
						href="/favorites"
						className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
					>
						<Star className="size-5" />
						Favorites
					</Link>

					<Link
						href="/compare"
						className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
					>
						<ArrowUpDown className="size-5" />
						Compare
					</Link>

					<Link
						href="/history"
						className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
					>
						<Clock className="size-5" />
						History
					</Link>
				</nav>
			</div>
		</header>
	);
}
