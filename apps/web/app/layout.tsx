import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { App } from "@/_app";
import "@/_app/styles/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Exora",
	description:
		"Explore global currencies, exchange rates, and historical trends.",
	icons: {
		icon: "https://files.nicodes.ru/exora.svg",
	},
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="ru"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased mx-auto w-[94%] sm:w-[90%] xl:w-[70%]`}
		>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</head>
			<body className="min-h-full flex flex-col bg-background">
				<App>{children}</App>
			</body>
		</html>
	);
}
