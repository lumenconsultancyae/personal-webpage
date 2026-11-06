"use client";

import HeaderSplash from "@/components/HeaderSplash";
import Testimonials from "@/components/Testimonials";
import {useCallback, useEffect, useRef, useState} from "react";
import Journey from "@/components/Journey";
import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/navigation";
import Projects from "@/components/Projects";
import PersonalHighlights from "@/components/PersonalHighlights";
import Traveling from "@/components/Traveling";
import FunFacts from "@/components/FunFacts";
import Gallery from "@/components/Gallery";
import ProfessionalHighlights from "@/components/ProfessionalHighlights";
import {Section} from "@/components/common/Sections";
import Philosophies from "@/components/Philosophies";


type SectionItem = {
    id: string;
    label: string;
    component: React.ReactNode;
    title: string;
    subtitle?: string;
};

const portfolioSections: SectionItem[] = [
    {
        id: "professionalHighlights",
        label: "Highlights",
        component: <ProfessionalHighlights/>,
        title: "Professional Highlights",
        subtitle: "My CV"
    },
    {
        id: "journey",
        label: "My Journey",
        component: <Journey/>,
        title: "About me",
        subtitle: "Work & Education"
    },
    {
        id: "testimonials",
        label: "Why me?",
        component: <Testimonials/>,
        title: "Why others value me?",
        subtitle: "Testimonials"
    },
    {
        id: "projects",
        label: "My Projects",
        component: <Projects/>,
        title: "My Projects",
        subtitle: "Current & Spotlighted Work"
    },
];

const personalSections: SectionItem[] = [
    {
        id: "aboutme",
        label: "About Me",
        component: <PersonalHighlights/>,
        title: "Who am I?",
        subtitle: "More Than Just Code"
    },
    {
        id: "traveling",
        label: "Travelling",
        component: <Traveling/>,
        title: "Where I've lived",
        subtitle: "Every place tells a story"
    },
    {
        id: "philosophy",
        label: "Philosophy",
        component: <Philosophies/>,
        title: "Philosophy",
        subtitle: "How I think about life and work"
    },
    {
        id: "funfacts",
        label: "10 Fun Facts",
        component: <FunFacts/>,
        title: "10 Fun Facts",
        subtitle: "What makes me... me"
    },
    {
        id: "gallery",
        label: "Photo Gallery",
        component: <Gallery/>,
        title: "Photo Gallery",
        subtitle: "Snapshots of my life"
    },
];

const pages = {
    personal: personalSections,
    portfolio: portfolioSections,
};

type PageKey = keyof typeof pages;

type FixedNavProps = {
    sections: SectionItem[];
    onNavigateAction: (path: string) => void;
};

function FixedNav({sections, onNavigateAction}: FixedNavProps) {
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
                className="pr-2 text-white hover:scale-150 transition"
                aria-label="Home"
                title="Back to Home"
            >
                🏠
            </button>

            {sections.map((section) => {
                const isActive = section.id === activeId;
                const hovered = section.id === hoveredId;

                return (
                    <button
                        key={section.label}
                        onClick={() => onNavigateAction(section.id)}
                        onMouseEnter={() => setHoveredId(section.id)}
                        onMouseLeave={() => setHoveredId("")}
                        className="pr-2 group flex items-center gap-2 relative"
                        aria-label={section.label}
                        title={section.label}
                        aria-current={isActive ? "location" : undefined}
                    >
                        <div
                            className={`w-3 h-3 rounded-full ${
                                isActive ? "bg-white scale-150" : "bg-gray-600"
                            } transition-all pr-3 hover:scale-150`}
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

export default function MainPage() {
    const [currentPage, setCurrentPage] = useState<PageKey | "">("");
    const router = useRouter();

    const handleNavigation = useCallback((targetId: string, page?: PageKey) => {
        if (page) setCurrentPage(page);
        else setCurrentPage("");

        const scrollTarget = targetId || "header";
        const newHash = scrollTarget !== "header" ? `#${scrollTarget}` : "#";
        router.push(newHash);

        requestAnimationFrame(() => {
            const el = document.getElementById(scrollTarget);
            if (el) {
                el.scrollIntoView({behavior: "smooth"});
            }
        });
    }, [router]);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#", "");
            for (const [page, sections] of Object.entries(pages)) {
                if (sections.some((s) => s.id === hash)) {
                    handleNavigation(hash, page as PageKey);
                    return;
                }
            }
            handleNavigation("");
        };

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [handleNavigation]);

    return (
        <main className="text-white font-sans">
            <AnimatePresence>
                {currentPage && (
                    <motion.div
                        key="fixed-nav"
                        initial={{x: 100, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        exit={{x: 100, opacity: 0}}
                        transition={{type: "spring", stiffness: 300, damping: 20}}
                        className="fixed right-0 top-1/2 -translate-y-1/2 z-50"
                    >
                        <FixedNav
                            sections={pages[currentPage as PageKey]}
                            onNavigateAction={(sectionId) => {
                                if (sectionId === "") handleNavigation("");
                                else handleNavigation(sectionId, currentPage);
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="h-screen snap-y snap-mandatory overflow-x-hidden scroll-smooth scrollbar-hide">
                <motion.div
                    className={currentPage === "" ? "h-screen snap-start" : "h-0 overflow-hidden"}
                    initial={{y: 0}}
                    animate={{y: currentPage === "" ? 0 : "-100vh"}}
                    transition={{duration: 0.3, ease: "easeInOut"}}
                >
                    <header id="header" className="h-[100vh]">
                        <HeaderSplash onNavigateAction={(page) => {
                            const firstSection = pages[page as PageKey]?.[0]?.id || "";
                            handleNavigation(firstSection, page as PageKey);
                        }}/>
                    </header>
                </motion.div>

                {currentPage === "portfolio" &&
                    portfolioSections.map((section) => (
                        <Section
                            id={section.id}
                            key={section.id}
                            title={section.title}
                            subtitle={section.subtitle}
                            className="min-h-screen snap-start"
                            type="professional">
                            {section.component}
                        </Section>
                    ))}

                {currentPage === "personal" &&
                    personalSections.map((section) => (
                        <Section
                            id={section.id}
                            key={section.id}
                            title={section.title}
                            subtitle={section.subtitle}
                            className="min-h-screen snap-start"
                            type="personal">
                            {section.component}
                        </Section>
                    ))}
            </div>
        </main>
    );
}
