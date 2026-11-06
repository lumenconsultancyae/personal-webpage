"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import {Briefcase, Home, User} from "lucide-react";
import ProfessionalHighlights from "@/components/ProfessionalHighlights";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonials";
import Projects from "@/components/Projects";
import PersonalHighlights from "@/components/PersonalHighlights";
import Traveling from "@/components/Traveling";
import Philosophies from "@/components/Philosophies";
import FunFacts from "@/components/FunFacts";
import Gallery from "@/components/Gallery";
import {Section} from "@/components/common/Sections";

export type SectionItem = {
    id: string;
    label: string;
    component: React.ReactNode;
    title: string;
    subtitle?: string;
};

export const portfolioSections: SectionItem[] = [
    {
        id: "professionalHighlights",
        label: "Highlights",
        component: <ProfessionalHighlights/>,
        title: "Professional Highlights",
        subtitle: "My CV",
    },
    {
        id: "journey",
        label: "My Journey",
        component: <Journey/>,
        title: "About me",
        subtitle: "Work & Education",
    },
    {
        id: "testimonials",
        label: "Why me?",
        component: <Testimonials/>,
        title: "Why others value me?",
        subtitle: "Testimonials",
    },
    {
        id: "projects",
        label: "My Projects",
        component: <Projects/>,
        title: "My Projects",
        subtitle: "Current & Spotlighted Work",
    },
];

export const personalSections: SectionItem[] = [
    {
        id: "aboutme",
        label: "About Me",
        component: <PersonalHighlights/>,
        title: "Who am I?",
        subtitle: "More Than Just Code",
    },
    {
        id: "traveling",
        label: "Travelling",
        component: <Traveling/>,
        title: "Where I've lived",
        subtitle: "Every place tells a story",
    },
    {
        id: "philosophy",
        label: "Philosophy",
        component: <Philosophies/>,
        title: "Philosophy",
        subtitle: "How I think about life and work",
    },
    {
        id: "funfacts",
        label: "10 Fun Facts",
        component: <FunFacts/>,
        title: "10 Fun Facts",
        subtitle: "What makes me... me",
    },
    {
        id: "gallery",
        label: "Photo Gallery",
        component: <Gallery/>,
        title: "Photo Gallery",
        subtitle: "Snapshots of my life",
    },
];

type FixedNavProps = {
    type: "professional" | "personal";
    sections: SectionItem[];
    onNavigateAction: (sectionId: string) => void;
    onSwitchModeAction: () => void;
};

export function FixedNav({
    type,
    sections,
    onNavigateAction,
    onSwitchModeAction,
}: FixedNavProps) {
    const [activeId, setActiveId] = useState(sections[0]?.id || "");
    const [hoveredId, setHoveredId] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            {rootMargin: "-40% 0px -40% 0px"}
        );

        const observedElements: HTMLElement[] = [];

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) {
                observer.observe(el);
                observedElements.push(el);
            }
        });

        return () => {
            observedElements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
        };
    }, [sections]);

    const accentDotClass =
        type === "professional"
            ? "bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.7)]"
            : "bg-pink-300 shadow-[0_0_10px_rgba(244,114,182,0.7)]";

    return (
        <motion.nav
            role="navigation"
            aria-label="Section navigation"
            className="bg-slate-950/65 border border-white/15 backdrop-blur-lg rounded-l-2xl py-4 pl-2.5 pr-2 flex flex-col items-center gap-3.5 shadow-2xl"
            transition={{type: "spring", stiffness: 200, damping: 20}}
        >
            <button
                onClick={() => onNavigateAction("")}
                className="p-1.5 rounded-lg text-white/85 hover:text-white hover:bg-white/10 transition"
                aria-label="Back to Home"
                title="Back to Home"
            >
                <Home className="w-4 h-4"/>
            </button>

            <div className="w-5 h-px bg-white/15"/>

            {sections.map((section) => {
                const isActive = section.id === activeId;
                const hovered = section.id === hoveredId;

                return (
                    <button
                        key={section.id}
                        onClick={() => onNavigateAction(section.id)}
                        onMouseEnter={() => setHoveredId(section.id)}
                        onMouseLeave={() => setHoveredId("")}
                        aria-label={section.label}
                        className="group relative flex items-center justify-center p-1 focus:outline-none"
                    >
                        <motion.span
                            layout
                            className={`rounded-full transition-all duration-300 ${
                                isActive
                                    ? `w-3 h-3 ${accentDotClass}`
                                    : "w-2 h-2 bg-white/40 group-hover:bg-white/80"
                            }`}
                            animate={{scale: isActive ? 1.2 : 1}}
                            transition={{type: "spring", stiffness: 300, damping: 20}}
                        />

                        {hovered && (
                            <span className="pointer-events-none absolute right-9 text-xs font-medium text-white whitespace-nowrap bg-slate-950/90 border border-white/15 px-2.5 py-1 rounded-md shadow-lg">
                                {section.label}
                            </span>
                        )}
                    </button>
                );
            })}

            <div className="w-5 h-px bg-white/15"/>

            <button
                onClick={onSwitchModeAction}
                className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition"
                aria-label={
                    type === "professional"
                        ? "Switch to Personal page"
                        : "Switch to Professional page"
                }
                title={
                    type === "professional"
                        ? "Switch to Personal page"
                        : "Switch to Professional page"
                }
            >
                {type === "professional" ? (
                    <User className="w-4 h-4 text-pink-300"/>
                ) : (
                    <Briefcase className="w-4 h-4 text-amber-300"/>
                )}
            </button>
        </motion.nav>
    );
}

type PageSectionsViewProps = {
    type: "professional" | "personal";
    sections: SectionItem[];
};

export default function PageSectionsView({type, sections}: PageSectionsViewProps) {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToSection = useCallback((sectionId: string) => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({behavior: "smooth"});
        }
    }, []);

    useEffect(() => {
        const applyHashScroll = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash && sections.some((s) => s.id === hash)) {
                requestAnimationFrame(() => scrollToSection(hash));
            }
        };
        applyHashScroll();
        window.addEventListener("hashchange", applyHashScroll);
        return () => window.removeEventListener("hashchange", applyHashScroll);
    }, [sections, scrollToSection]);

    const handleNavigate = useCallback(
        (sectionId: string) => {
            if (!sectionId) {
                router.push("/");
                return;
            }
            window.history.replaceState(null, "", `#${sectionId}`);
            scrollToSection(sectionId);
        },
        [router, scrollToSection]
    );

    const handleSwitchMode = useCallback(() => {
        router.push(type === "professional" ? "/personal" : "/professional");
    }, [router, type]);

    return (
        <main
            className={`text-white font-sans ${
                type === "professional"
                    ? "bg-professional-canvas"
                    : "bg-personal-canvas"
            }`}
        >
            <motion.div
                key="fixed-nav"
                initial={{x: 80, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{type: "spring", stiffness: 260, damping: 22}}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-50"
            >
                <FixedNav
                    type={type}
                    sections={sections}
                    onNavigateAction={handleNavigate}
                    onSwitchModeAction={handleSwitchMode}
                />
            </motion.div>

            <div
                ref={containerRef}
                className="h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide"
            >
                {sections.map((section) => (
                    <Section
                        id={section.id}
                        key={section.id}
                        title={section.title}
                        subtitle={section.subtitle}
                        type={type}
                    >
                        {section.component}
                    </Section>
                ))}
            </div>
        </main>
    );
}
