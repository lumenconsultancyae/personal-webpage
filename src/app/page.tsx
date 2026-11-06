"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import HeaderSplash from "@/components/HeaderSplash";
import {personalSections, portfolioSections} from "@/components/PageSectionsView";

export default function MainPage() {
    const router = useRouter();

    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash.replace("#", "");
            if (!hash) return;
            if (portfolioSections.some((s) => s.id === hash)) {
                router.replace(`/professional#${hash}`);
            } else if (personalSections.some((s) => s.id === hash)) {
                router.replace(`/personal#${hash}`);
            }
        };
        handleHash();
        window.addEventListener("hashchange", handleHash);
        return () => window.removeEventListener("hashchange", handleHash);
    }, [router]);

    return (
        <main className="text-white font-sans h-screen overflow-hidden">
            <header id="header" className="h-full">
                <HeaderSplash
                    onNavigateAction={(page) => {
                        if (page === "portfolio" || page === "professional") {
                            router.push("/professional");
                        } else if (page === "personal") {
                            router.push("/personal");
                        }
                    }}
                />
            </header>
        </main>
    );
}
