"use client";

import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    ArrowRight,
    Briefcase,
    CheckCircle2,
    Download,
    ExternalLink,
    Mail,
    Phone,
    Sparkles,
} from "lucide-react";
import {useProfileOverviewQuery} from "@/application/usePortfolioQueries";
import {RouteSkeleton} from "@/components/ui/ErrorBoundary";

function useTypewriter(words: string[]) {
    const safeWords = words.length > 0 ? words : ["deliver software solutions"];
    const [wordIdx, setWordIdx] = useState(0);
    const [charCount, setCharCount] = useState(safeWords[0].length);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = safeWords[wordIdx % safeWords.length];
        const isFinalPhrase = wordIdx % safeWords.length === safeWords.length - 1;

        let timeoutMs = isDeleting ? 45 : isFinalPhrase ? 75 : 55;

        if (!isDeleting && charCount === currentWord.length) {
            timeoutMs = isFinalPhrase ? 3500 : 1000;
        } else if (isDeleting && charCount === 0) {
            timeoutMs = 180;
        }

        const timer = setTimeout(() => {
            if (!isDeleting && charCount === currentWord.length) {
                setIsDeleting(true);
            } else if (isDeleting && charCount > 0) {
                setCharCount((prev) => prev - 1);
            } else if (isDeleting && charCount === 0) {
                setIsDeleting(false);
                setWordIdx((prev) => (prev + 1) % safeWords.length);
            } else {
                setCharCount((prev) => prev + 1);
            }
        }, timeoutMs);

        return () => clearTimeout(timer);
    }, [safeWords, wordIdx, charCount, isDeleting]);

    const currentWord = safeWords[wordIdx % safeWords.length];
    return currentWord.slice(0, charCount);
}

export default function OverviewRoute() {
    const {data: profile, isLoading} = useProfileOverviewQuery();
    const typedRole = useTypewriter(profile?.roles ?? []);

    if (isLoading || !profile) {
        return <RouteSkeleton rows={3}/>;
    }

    return (
        <div data-testid="overview-route" className="space-y-8">
            {/* Splash Hero with Typewriter & Backspace Animation + Avatar */}
            <section
                aria-labelledby="hero-heading"
                className="surface-card p-6 sm:p-10 relative overflow-hidden"
            >
                <div className="grid gap-8 lg:grid-cols-12 items-center">
                    <div className="lg:col-span-8 space-y-5">
                        <div className="inline-flex items-center gap-2 badge-accent">
                            <Briefcase className="w-3.5 h-3.5" aria-hidden="true"/>
                            <span>Staff Software &amp; Data Engineer</span>
                        </div>

                        <h1
                            id="hero-heading"
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
                        >
                            Hi, I am{" "}
                            <span style={{color: "var(--accent-primary)"}}>
                                {profile.fullName}
                            </span>
                            <span
                                style={{color: "var(--text-secondary)"}}
                                className="block text-xl sm:text-2xl lg:text-3xl font-medium mt-2 min-h-[1.5em]"
                            >
                                I{" "}
                                <span
                                    aria-live="polite"
                                    data-testid="dynamic-role-text"
                                    style={{color: "var(--accent-secondary)"}}
                                    className="font-semibold"
                                >
                                    {typedRole}
                                </span>
                                <span
                                    aria-hidden="true"
                                    style={{color: "var(--accent-primary)"}}
                                    className="inline-block ms-0.5 font-light animate-pulse"
                                >
                                    |
                                </span>
                            </span>
                        </h1>

                        <p
                            style={{color: "var(--text-secondary)"}}
                            className="text-base sm:text-lg max-w-2xl leading-relaxed"
                        >
                            {profile.pitch}
                        </p>

                        {/* Primary Separation Choice: Professional Portfolio vs. Personal World */}
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                            <Link
                                to="/projects"
                                data-testid="hero-cta-projects"
                                className="btn-primary inline-flex items-center gap-2 text-sm"
                            >
                                <Briefcase className="w-4 h-4" aria-hidden="true"/>
                                Professional Projects
                                <ArrowRight className="w-4 h-4" aria-hidden="true"/>
                            </Link>

                            <Link
                                to="/journey"
                                data-testid="hero-cta-journey"
                                className="btn-secondary inline-flex items-center gap-2 text-sm"
                            >
                                Career Journey
                            </Link>

                            <Link
                                to="/personal"
                                data-testid="hero-cta-personal"
                                className="btn-secondary inline-flex items-center gap-2 text-sm"
                            >
                                <Sparkles
                                    style={{color: "var(--accent-primary)"}}
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                />
                                Personal World
                            </Link>

                            <a
                                href="/FinalResume.pdf"
                                download
                                data-testid="hero-cta-cv"
                                className="btn-secondary inline-flex items-center gap-2 text-sm"
                            >
                                <Download className="w-4 h-4" aria-hidden="true"/>
                                Download CV
                            </a>
                        </div>

                        {/* Compact Executive KPI Strip */}
                        <div
                            aria-label="Key career metrics"
                            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3"
                        >
                            {profile.kpis.map((kpi, idx) => (
                                <div
                                    key={kpi.label}
                                    data-testid={`kpi-card-${idx}`}
                                    className="surface-elevated px-3.5 py-2.5"
                                >
                                    <p
                                        data-numeric="true"
                                        style={{color: "var(--accent-primary)"}}
                                        className="text-xl font-bold tabular-nums"
                                    >
                                        {kpi.value}
                                    </p>
                                    <p
                                        style={{color: "var(--text-muted)"}}
                                        className="text-xs font-medium leading-snug"
                                    >
                                        {kpi.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex justify-center">
                        <div className="surface-elevated p-5 rounded-2xl flex flex-col items-center text-center max-w-xs w-full">
                            <img
                                src="/profile-hi.png"
                                alt="Wilson Guevara avatar"
                                width={210}
                                height={310}
                                className="w-44 h-56 object-contain mx-auto"
                            />
                            <div className="mt-3 space-y-0.5">
                                <p className="font-semibold text-sm">
                                    {profile.fullName}
                                </p>
                                <p
                                    style={{color: "var(--text-muted)"}}
                                    className="text-xs"
                                >
                                    {profile.handle} · Dubai, UAE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual World Cards: Professional Engineering vs. Personal Life & Community */}
            <section
                aria-label="Explore Professional and Personal Worlds"
                className="grid gap-6 lg:grid-cols-2"
            >
                <article className="surface-card overflow-hidden flex flex-col justify-between">
                    <div className="grid sm:grid-cols-3 gap-1 p-1.5 pb-0">
                        <img
                            src="/gallery/dev-workspace.png"
                            alt="Engineering & architecture workspace"
                            className="w-full h-36 object-cover rounded-lg"
                        />
                        <img
                            src="/gallery/dubai-chapter.png"
                            alt="Dubai technology chapter"
                            className="w-full h-36 object-cover rounded-lg"
                        />
                        <img
                            src="/gallery/singapore-skyline.png"
                            alt="Singapore fintech chapter"
                            className="w-full h-36 object-cover rounded-lg"
                        />
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between gap-2">
                            <span className="badge-accent inline-flex items-center gap-1.5">
                                <Briefcase className="w-3.5 h-3.5" aria-hidden="true"/>
                                Professional Portfolio
                            </span>
                            <span
                                style={{color: "var(--text-muted)"}}
                                className="text-xs"
                            >
                                Colombia · Singapore · UAE
                            </span>
                        </div>
                        <h2 id="competencies-heading" className="text-xl font-semibold">
                            Professional Highlights &amp; Systems Architecture
                        </h2>
                        <p
                            style={{color: "var(--text-secondary)"}}
                            className="text-sm leading-relaxed"
                        >
                            {profile.summaryParagraphs[0]}
                        </p>
                        <ul className="grid gap-2 sm:grid-cols-2">
                            {profile.coreCompetencies.map((item) => (
                                <li
                                    key={item}
                                    className="surface-elevated px-3 py-2 flex items-center gap-2 text-xs font-medium"
                                >
                                    <CheckCircle2
                                        style={{color: "var(--accent-secondary)"}}
                                        className="w-3.5 h-3.5 shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-2.5 pt-1">
                            <Link
                                to="/projects"
                                className="btn-primary text-xs inline-flex items-center gap-1.5"
                            >
                                Explore Projects
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true"/>
                            </Link>
                            <Link
                                to="/testimonials"
                                className="btn-secondary text-xs inline-flex items-center gap-1.5"
                            >
                                Peer Testimonials &amp; Stack
                            </Link>
                        </div>
                    </div>
                </article>

                <article className="surface-card overflow-hidden flex flex-col justify-between">
                    <div className="grid grid-cols-3 gap-1 p-1.5 pb-0">
                        <img
                            src="/gallery/group.jpg"
                            alt="Hosting board game night with friends in Dubai"
                            className="w-full h-36 object-cover rounded-lg"
                        />
                        <img
                            src="/gallery/family-moment.png"
                            alt="Fatherhood and family moments"
                            className="w-full h-36 object-cover rounded-lg"
                        />
                        <img
                            src="/gallery/colombia-cocora.png"
                            alt="Colombia Cocora Valley mountains"
                            className="w-full h-36 object-cover rounded-lg"
                        />
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between gap-2">
                            <span className="badge-secondary inline-flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" aria-hidden="true"/>
                                Beyond the Keyboard
                            </span>
                            <span
                                style={{color: "var(--text-muted)"}}
                                className="text-xs"
                            >
                                Fatherhood · @bgameplan · Coffee Lab
                            </span>
                        </div>
                        <h2 className="text-xl font-semibold">
                            Personal World, Travel &amp; Let&apos;s Connect
                        </h2>
                        <p
                            style={{color: "var(--text-secondary)"}}
                            className="text-sm leading-relaxed"
                        >
                            Life is more than semicolons and sprints. Outside of work I host weekly board-game nights in Dubai (@bgameplan), explore specialty coffee, travel with family, and design custom tabletop games.
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <a
                                href="mailto:wilsonr100@gmail.com"
                                className="surface-elevated px-3.5 py-2.5 flex items-center justify-between text-xs hover:opacity-90 transition"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Mail
                                        style={{color: "var(--accent-primary)"}}
                                        className="w-3.5 h-3.5"
                                        aria-hidden="true"
                                    />
                                    <span>wilsonr100@gmail.com</span>
                                </span>
                                <ExternalLink className="w-3 h-3" aria-hidden="true"/>
                            </a>

                            <a
                                href="tel:+971565712642"
                                className="surface-elevated px-3.5 py-2.5 flex items-center justify-between text-xs tabular-nums hover:opacity-90 transition"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Phone
                                        style={{color: "var(--accent-secondary)"}}
                                        className="w-3.5 h-3.5"
                                        aria-hidden="true"
                                    />
                                    <span>+971 565712642</span>
                                </span>
                                <ExternalLink className="w-3 h-3" aria-hidden="true"/>
                            </a>
                        </div>
                        <div className="flex flex-wrap gap-2.5 pt-1">
                            <Link
                                to="/personal"
                                className="btn-primary text-xs inline-flex items-center gap-1.5"
                            >
                                Visit Personal Page
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true"/>
                            </Link>
                            <Link
                                to="/contact"
                                data-testid="overview-contact-link"
                                className="btn-secondary text-xs inline-flex items-center gap-1.5"
                            >
                                Send a Direct Message
                            </Link>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}
