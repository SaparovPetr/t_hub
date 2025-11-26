import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers/provider";
import { siteConfig } from "../config/site.config";
import Header from "@/components/UI/layout/header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";
import AppLoader from "@/hoc/app-loader";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	///47///
	const session = await auth();

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					{/* ///46/// */}
					<SessionProvider session={session}>
						{/* ///64/// */}
						<AppLoader>
							<div className="min-h-screen">
								<Header />
								{/* ///9/// */}
								{/* ///15/// */}
								<main
									className={`flex flex-col max-w-5xl mx-auto p-6 items-center `}
								>
									{children}
								</main>
							</div>
						</AppLoader>
					</SessionProvider>
				</Providers>
			</body>
		</html>
	);
}
