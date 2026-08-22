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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="ru"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased mx-auto w-[70%] max-w-1440px`}
		>
			<body className="min-h-full flex flex-col bg-background">
				<App>{children}</App>
			</body>
		</html>
	);
}
