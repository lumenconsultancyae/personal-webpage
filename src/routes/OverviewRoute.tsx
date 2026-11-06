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

export default function OverviewRoute() {
    const {data: profile, isLoading} = useProfileOverviewQuery();
    const [roleIdx, setRoleIdx] = useState(0);

    useEffect(() => {
        if (!profile?.roles.length) return;
        const timer = setInterval(() => {
            setRoleIdx((prev) => (prev + 1) % profile.roles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [profile?.roles]);

    if (isLoading || !profile) {
        return <RouteSkeleton rows={3}/>;
    }

    const activeRole = profile.roles[roleIdx] ?? profile.roles[0];

    return (
        <div data-testid="overview-route" className="space-y-8">
            {/* Low-Density Splash Hero with Dedicated Professional vs. Personal Entry */}
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
                                className="block text-xl sm:text-2xl lg:text-3xl font-medium mt-2"
                            >
                                I{" "}
                                <span
                                    aria-live="polite"
                                    data-testid="dynamic-role-text"
                                    style={{color: "var(--accent-secondary)"}}
                                    className="font-semibold underline decoration-dotted underline-offset-4"
                                >
                                    {activeRole}
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

            {/* Focused Professional Highlights & Direct Contact */}
            <section
                aria-labelledby="competencies-heading"
                className="grid gap-6 lg:grid-cols-12"
            >
                <div className="lg:col-span-7 surface-card p-6 space-y-4">
                    <h2 id="competencies-heading" className="text-lg font-semibold">
                        Professional Highlights
                    </h2>
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
                            Let&apos;s Build Something Together
                        </h2>
                        <p
                            style={{color: "var(--text-secondary)"}}
                            className="text-sm leading-relaxed"
                        >
                            Whether you want to work together, have a question, or just want to say hi — my inbox is always open.
                        </p>
                    </div>

                    <div className="space-y-2.5">
                        <a
                            href="mailto:wilsonr100@gmail.com"
                            className="surface-elevated px-4 py-3 flex items-center justify-between text-sm hover:opacity-90 transition"
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
                            className="surface-elevated px-4 py-3 flex items-center justify-between text-sm tabular-nums hover:opacity-90 transition"
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
