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
    Sparkles,
} from "lucide-react";
import {useProfileOverviewQuery} from "@/application/usePortfolioQueries";
import {PROFESSIONAL_BLOG_POSTS} from "@/infrastructure/blogPosts";
import {BlogFeedSection} from "@/components/ui/BlogFeedSection";
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
        <div data-testid="overview-route" className="space-y-3.5">
            {/* Compact Single-Screen Hero with Typewriter, CV, LinkedIn & Metrics */}
            <section
                aria-labelledby="hero-heading"
                className="surface-card p-3.5 sm:p-4 relative overflow-hidden"
            >
                <div className="grid gap-3.5 lg:grid-cols-12 items-center">
                    <div className="lg:col-span-7 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1 badge-accent text-[11px] py-0.5 px-2">
                                    <Briefcase className="w-3 h-3" aria-hidden="true"/>
                                    <span>Staff Software &amp; Data Engineer</span>
                                </span>
                                <span
                                    style={{color: "var(--text-muted)"}}
                                    className="text-xs font-mono"
                                >
                                    {profile.handle} · Dubai, UAE
                                </span>
                            </div>
                        </div>

                        <h1
                            id="hero-heading"
                            className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-snug flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5"
                        >
                            <span>
                                Hi, I am{" "}
                                <span style={{color: "var(--accent-primary)"}}>
                                    {profile.fullName}
                                </span>
                            </span>
                            <span
                                style={{color: "var(--text-secondary)"}}
                                className="text-base sm:text-lg lg:text-xl font-medium"
                            >
                                — I{" "}
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
                            className="text-xs max-w-2xl leading-relaxed"
                        >
                            {profile.summaryParagraphs[0]}
                        </p>

                        {/* Compact Competency Pills */}
                        <div className="flex flex-wrap gap-1">
                            {profile.coreCompetencies.map((item) => (
                                <span
                                    key={item}
                                    className="surface-elevated px-2 py-0.5 text-[10px] sm:text-[11px] font-medium inline-flex items-center gap-1"
                                >
                                    <CheckCircle2
                                        style={{color: "var(--accent-secondary)"}}
                                        className="w-2.5 h-2.5 shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span>{item}</span>
                                </span>
                            ))}
                        </div>

                        {/* Primary Actions: CV, LinkedIn, Projects, Full CV Timeline, Personal Blog, Contact */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            <a
                                href="/FinalResume.pdf"
                                download
                                data-testid="hero-cta-cv"
                                className="btn-primary inline-flex items-center gap-1 text-xs py-1.5 px-2.5"
                            >
                                <Download className="w-3 h-3" aria-hidden="true"/>
                                Download CV (PDF)
                            </a>

                            <a
                                href="https://www.linkedin.com/in/wilsonr990/"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="hero-cta-linkedin"
                                className="btn-secondary inline-flex items-center gap-1 text-xs py-1.5 px-2.5"
                            >
                                <span>LinkedIn</span>
                                <ExternalLink className="w-3 h-3" aria-hidden="true"/>
                            </a>

                            <Link
                                to="/projects"
                                data-testid="hero-cta-projects"
                                className="btn-secondary inline-flex items-center gap-1 text-xs py-1.5 px-2.5"
                            >
                                <Briefcase className="w-3 h-3" aria-hidden="true"/>
                                Projects
                            </Link>

                            <Link
                                to="/journey"
                                data-testid="hero-cta-journey"
                                className="btn-secondary inline-flex items-center gap-1 text-xs py-1.5 px-2.5"
                            >
                                Full CV Timeline
                            </Link>

                            <Link
                                to="/personal"
                                data-testid="hero-cta-personal"
                                className="btn-secondary inline-flex items-center gap-1 text-xs py-1.5 px-2.5"
                            >
                                <Sparkles
                                    style={{color: "var(--accent-primary)"}}
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                />
                                Personal Blog
                                <ArrowRight className="w-3 h-3" aria-hidden="true"/>
                            </Link>

                            <Link
                                to="/contact"
                                data-testid="overview-contact-link"
                                className="btn-secondary inline-flex items-center gap-1 text-xs py-1.5 px-2.5"
                            >
                                <Mail className="w-3 h-3" aria-hidden="true"/>
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Compact Avatar + 2x2 KPI Bento Grid */}
                    <div className="lg:col-span-5 grid sm:grid-cols-12 gap-2.5 items-center">
                        <div className="sm:col-span-4 surface-elevated p-2 rounded-xl flex flex-col items-center text-center">
                            <img
                                src="/profile-hi.png"
                                alt="Wilson Guevara avatar"
                                width={120}
                                height={160}
                                className="w-20 sm:w-24 h-24 sm:h-28 object-contain mx-auto"
                            />
                            <p className="font-semibold text-[11px] mt-1">
                                {profile.fullName}
                            </p>
                        </div>

                        <div
                            aria-label="Key career metrics"
                            className="sm:col-span-8 grid grid-cols-2 gap-2"
                        >
                            {profile.kpis.map((kpi, idx) => (
                                <div
                                    key={kpi.label}
                                    data-testid={`kpi-card-${idx}`}
                                    className="surface-elevated p-2.5"
                                >
                                    <p
                                        data-numeric="true"
                                        style={{color: "var(--accent-primary)"}}
                                        className="text-base sm:text-lg font-bold tabular-nums leading-tight"
                                    >
                                        {kpi.value}
                                    </p>
                                    <p
                                        style={{color: "var(--text-muted)"}}
                                        className="text-[10px] sm:text-[11px] font-medium leading-snug"
                                    >
                                        {kpi.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Split-Pane Animated Professional Blog & Experience Reader */}
            <BlogFeedSection
                heading="Engineering Blog, Experience & Architecture Stories"
                subheading="Select any chapter to read about my work in AI/MLOps, Fintech, EdTech, and Open-Source Compilers"
                posts={PROFESSIONAL_BLOG_POSTS}
                testIdPrefix="professional"
            />
        </div>
    );
}
