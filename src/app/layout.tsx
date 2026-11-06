import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Wilson Guevara (@wilsonr990) — Staff Software & Data Engineer",
    description:
        "Executive portfolio, systems architecture, career journey, and open-source projects of Wilson Guevara.",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="dark" dir="ltr">
            <body className="antialiased font-sans">{children}</body>
        </html>
    );
}
