import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Wilsonr990",
    description: "Wilson Guevara — Professional Portfolio & Personal Page",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="antialiased bg-blue-900">{children}</body>
        </html>
    );
}
