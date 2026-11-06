"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import {Home} from "lucide-react";
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
    sections: SectionItem[];
    onNavigateAction: (sectionId: string) => void;
};

export function FixedNav({sections, onNavigateAction}: FixedNavProps) {
    const [activeId, setActiveId] = useState(sections[0]?.id || "");
    const [hoveredId, setHoveredId] = useState("");
    const [scrolling, setScrolling] = useState(false);
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    useEffect(() => {
        setScrolling(true);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            setScrolling(false);
        }, 2000);

        return () => {
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, [activeId]);

    return (
        <motion.nav
            role="navigation"
            aria-label="Section navigation"
            className="bg-black/60 backdrop-blur-md rounded-l-full pt-5 pb-8 pl-3 flex flex-col items-center gap-4"
            transition={{type: "spring", stiffness: 200, damping: 20}}
            whileHover={{scale: 1.1}}
        >
            <button
                onClick={() => onNavigateAction("")}
                className="pr-2 text-white hover:scale-125 transition"
                aria-label="Home"
                title="Back to Home"
            >
                <Home className="w-5 h-5"/>
            </button>

            {sections.map((section) => {
                const isActive = section.id === activeId;
                const hovered = section.id === hoveredId;

                return (
                    <button
                        key={section.id}
                        onClick={() => onNavigateAction(section.id)}
                        onMouseEnter={() => setHoveredId(section.id)}
                        onMouseLeave={() => setHoveredId("")}
                        className="group relative flex items-center pr-3 focus:outline-none"
                    >
                        <motion.span
                            layout
                            className={`rounded-full transition-colors duration-300 ${
                                isActive
                                    ? "w-3.5 h-3.5 bg-white"
                                    : "w-2.5 h-2.5 bg-gray-400 opacity-50 group-hover:opacity-80"
                            }`}
                            animate={{scale: isActive ? 1.3 : 1}}
                            transition={{type: "spring", stiffness: 300, damping: 20}}
                        />

                        <motion.span
                            initial={{opacity: 0, x: 10}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 10}}
                            className={`${
                                hovered || (scrolling && isActive) ? "visible" : "hidden"
                            } absolute right-10 text-sm text-white whitespace-nowrap bg-black/70 px-2 py-0.5 rounded`}
                        >
                            {section.label}
                        </motion.span>
                    </button>
                );
            })}
        </motion.nav>
    );
}

type PageSectionsViewProps = {
    type: "professional" | "personal";
    sections: SectionItem[];
};

export default function PageSectionsView({type, sections}: PageSectionsViewProps) {
    const router = useRouter();

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

    return (
        <main className="text-white font-sans">
            <motion.div
                key="fixed-nav"
                initial={{x: 100, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{type: "spring", stiffness: 300, damping: 20}}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-50"
            >
                <FixedNav sections={sections} onNavigateAction={handleNavigate}/>
            </motion.div>

            <div className="h-screen snap-y snap-mandatory overflow-x-hidden scroll-smooth scrollbar-hide">
                {sections.map((section) => (
                    <Section
                        id={section.id}
                        key={section.id}
                        title={section.title}
                        subtitle={section.subtitle}
                        className="min-h-screen snap-start"
                        type={type}
                    >
                        {section.component}
                    </Section>
                ))}
            </div>
        </main>
    );
}
