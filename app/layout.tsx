import "@/app/globals.css";
import { inter } from "@/components/fonts";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ClearCargo",
	description: "shipments clearance",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className}  antialiased`}>
				<main className="flex-grow md:overflow-y-auto">{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
