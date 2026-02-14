import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "DigiFlow | Premium n8n Hosting",
    description: "Experience premium n8n hosting with DigiFlow. Design, build, and scale your automations effortlessly.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
