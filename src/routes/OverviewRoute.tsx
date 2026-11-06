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
        <div data-testid="overview-route" className="space-y-10">
            {/* Hero with Typewriter & Backspace Animation, CV Download & LinkedIn Links */}
            <section
                aria-labelledby="hero-heading"
                className="surface-card p-6 sm:p-10 relative overflow-hidden"
            >
                <div className="grid gap-8 lg:grid-cols-12 items-center">
                    <div className="lg:col-span-8 space-y-5">
                        <div className="inline-flex items-center gap-2 badge-accent">
                            <Briefcase className="w-3.5 h-3.5" aria-hidden="true"/>
                            <span>Staff Software &amp; Data Engineer · Engineering Blog &amp; CV</span>
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
                            {profile.pitch} Welcome to my professional engineering blog &amp; interactive CV—where I share architecture stories, production case studies, and open-source projects.
                        </p>

                        {/* Primary Actions: CV, LinkedIn, GitLab, Projects, Personal Blog */}
                        <div className="flex flex-wrap items-center gap-2.5 pt-1">
                            <a
                                href="/FinalResume.pdf"
                                download
                                data-testid="hero-cta-cv"
                                className="btn-primary inline-flex items-center gap-2 text-sm"
                            >
                                <Download className="w-4 h-4" aria-hidden="true"/>
                                Download CV (PDF)
                            </a>

                            <a
                                href="https://www.linkedin.com/in/wilsonr990/"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="hero-cta-linkedin"
                                className="btn-secondary inline-flex items-center gap-2 text-sm"
                            >
                                <span>LinkedIn Profile</span>
                                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true"/>
                            </a>

                            <a
                                href="https://gitlab.com/wilsonr990"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary inline-flex items-center gap-2 text-sm"
                            >
                                <span>GitLab</span>
                                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true"/>
                            </a>

                            <Link
                                to="/projects"
                                data-testid="hero-cta-projects"
                                className="btn-secondary inline-flex items-center gap-2 text-sm"
                            >
                                <Briefcase className="w-4 h-4" aria-hidden="true"/>
                                Projects Catalog
                            </Link>

                            <Link
                                to="/journey"
                                data-testid="hero-cta-journey"
                                className="btn-secondary inline-flex items-center gap-2 text-sm"
                            >
                                Full CV Timeline
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
                                Personal Blog (Board Games, Movies &amp; Music)
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true"/>
                            </Link>
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

            {/* Professional Engineering & Experience Blog Feed */}
            <BlogFeedSection
                heading="Engineering Blog, Experience & Architecture Stories"
                subheading="Read about my experience across AI/MLOps in Dubai, fintech microservices in Singapore, EdTech at Guinness World Record scale, and open-source compilers"
                posts={PROFESSIONAL_BLOG_POSTS}
                testIdPrefix="professional"
            />

            {/* CV Summary & Direct Contact */}
            <section
                aria-labelledby="competencies-heading"
                className="grid gap-6 lg:grid-cols-12"
            >
                <div className="lg:col-span-7 surface-card p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 id="competencies-heading" className="text-lg font-semibold">
                            CV Executive Summary &amp; Core Competencies
                        </h2>
                        <a
                            href="/FinalResume.pdf"
                            download
                            className="btn-secondary text-xs py-1 px-2.5 inline-flex items-center gap-1.5"
                        >
                            <Download className="w-3.5 h-3.5" aria-hidden="true"/>
                            Download PDF Resume
                        </a>
                    </div>
                    <p
                        style={{color: "var(--text-secondary)"}}
                        className="text-sm leading-relaxed"
                    >
                        {profile.summaryParagraphs[0]}{" "}
                        {profile.summaryParagraphs[1]}
                    </p>
                    <ul className="grid gap-2.5 sm:grid-cols-2 pt-1">
                        {profile.coreCompetencies.map((item) => (
                            <li
                                key={item}
                                className="surface-elevated px-3.5 py-2.5 flex items-center gap-2.5 text-sm"
                            >
                                <CheckCircle2
                                    style={{color: "var(--accent-secondary)"}}
                                    className="w-4 h-4 shrink-0"
                                    aria-hidden="true"
                                />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-5 surface-card p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">
                            Connect on LinkedIn or Direct Contact
                        </h2>
                        <p
                            style={{color: "var(--text-secondary)"}}
                            className="text-sm leading-relaxed"
                        >
                            Whether you want to collaborate on distributed systems, discuss AI/MLOps architecture, or just say hi — my inbox and LinkedIn are always open.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <a
                            href="https://www.linkedin.com/in/wilsonr990/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="surface-elevated px-4 py-2.5 flex items-center justify-between text-sm hover:opacity-90 transition"
                        >
                            <span className="font-medium">
                                linkedin.com/in/wilsonr990
                            </span>
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true"/>
                        </a>

                        <a
                            href="mailto:wilsonr100@gmail.com"
                            className="surface-elevated px-4 py-2.5 flex items-center justify-between text-sm hover:opacity-90 transition"
                        >
                            <span className="inline-flex items-center gap-2.5">
                                <Mail
                                    style={{color: "var(--accent-primary)"}}
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                />
                                <span>wilsonr100@gmail.com</span>
                            </span>
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true"/>
                        </a>

                        <a
                            href="tel:+971565712642"
                            className="surface-elevated px-4 py-2.5 flex items-center justify-between text-sm tabular-nums hover:opacity-90 transition"
                        >
                            <span className="inline-flex items-center gap-2.5">
                                <Phone
                                    style={{color: "var(--accent-secondary)"}}
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                />
                                <span>+971 565712642</span>
                            </span>
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true"/>
                        </a>
                    </div>

                    <Link
                        to="/contact"
                        data-testid="overview-contact-link"
                        className="btn-primary w-full text-center text-sm inline-flex items-center justify-center gap-2"
                    >
                        Send a Direct Message
                        <ArrowRight className="w-4 h-4" aria-hidden="true"/>
                    </Link>
                </div>
            </section>
        </div>
    );
}
