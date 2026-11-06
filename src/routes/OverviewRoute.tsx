"use client";

import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    ArrowRight,
    Award,
    Briefcase,
    CheckCircle2,
    Code2,
    Download,
    ExternalLink,
    Globe2,
    Layers,
    Mail,
    Phone,
    Sparkles,
} from "lucide-react";
import {
    useProfileOverviewQuery,
    useProjectsQuery,
} from "@/application/usePortfolioQueries";
import {RouteSkeleton} from "@/components/ui/ErrorBoundary";

export default function OverviewRoute() {
    const {data: profile, isLoading} = useProfileOverviewQuery();
    const {data: projects = []} = useProjectsQuery();
    const [roleIdx, setRoleIdx] = useState(0);

    useEffect(() => {
        if (!profile?.roles.length) return;
        const timer = setInterval(() => {
            setRoleIdx((prev) => (prev + 1) % profile.roles.length);
        }, 3200);
        return () => clearInterval(timer);
    }, [profile?.roles]);

    if (isLoading || !profile) {
        return <RouteSkeleton rows={4}/>;
    }

    const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
    const activeRole = profile.roles[roleIdx] ?? profile.roles[0];

    return (
        <div data-testid="overview-route" className="space-y-10">
            {/* Hero Banner */}
            <section
                aria-labelledby="hero-heading"
                className="surface-card p-6 sm:p-10 relative overflow-hidden"
            >
                <div className="grid gap-8 lg:grid-cols-12 items-center">
                    <div className="lg:col-span-8 space-y-5">
                        <div className="inline-flex items-center gap-2 badge-accent">
                            <Sparkles className="w-3.5 h-3.5" aria-hidden="true"/>
                            <span>Staff Software &amp; Data Engineering Portfolio</span>
                        </div>

                        <h1
                            id="hero-heading"
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
                        >
                            Hi, I am{" "}
                            <span style={{color: "var(--accent-primary)"}}>
                                {profile.fullName}
                            </span>
                            <span className="block text-xl sm:text-2xl lg:text-3xl font-medium mt-2" style={{color: "var(--text-secondary)"}}>
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
                            {profile.pitch}{" "}
                            {profile.summaryParagraphs[0]}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Link
                                to="/projects"
                                data-testid="hero-cta-projects"
                                className="btn-primary inline-flex items-center gap-2 text-sm"
                            >
                                <Code2 className="w-4 h-4" aria-hidden="true"/>
                                Explore Projects
                                <ArrowRight className="w-4 h-4" aria-hidden="true"/>
                            </Link>

                            <Link
                                to="/journey"
                                data-testid="hero-cta-journey"
                                className="btn-secondary inline-flex items-center gap-2 text-sm"
                            >
                                <Briefcase className="w-4 h-4" aria-hidden="true"/>
                                Career Timeline
                            </Link>

                            <Link
                                to="/personal"
                                data-testid="hero-cta-personal"
                                className="btn-secondary inline-flex items-center gap-2 text-sm"
                            >
                                Personal &amp; Gallery
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
                    </div>

                    <div className="lg:col-span-4 flex justify-center">
                        <div className="surface-elevated p-4 rounded-2xl flex flex-col items-center text-center max-w-xs w-full">
                            <img
                                src="/profile-hi.png"
                                alt="Wilson Guevara avatar"
                                width={220}
                                height={320}
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

            {/* KPI Metrics Grid */}
            <section aria-label="Career Key Performance Indicators">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {profile.kpis.map((kpi, idx) => {
                        const icons = [
                            <Briefcase key="b" className="w-5 h-5" aria-hidden="true"/>,
                            <Globe2 key="g" className="w-5 h-5" aria-hidden="true"/>,
                            <Layers key="l" className="w-5 h-5" aria-hidden="true"/>,
                            <Award key="a" className="w-5 h-5" aria-hidden="true"/>,
                        ];
                        return (
                            <div
                                key={kpi.label}
                                data-testid={`kpi-card-${idx}`}
                                className="surface-card p-5 flex items-start justify-between gap-4"
                            >
                                <div className="space-y-1">
                                    <p
                                        style={{color: "var(--text-muted)"}}
                                        className="text-xs uppercase tracking-wider font-medium"
                                    >
                                        {kpi.label}
                                    </p>
                                    <p
                                        data-numeric="true"
                                        style={{color: "var(--accent-primary)"}}
                                        className="text-3xl font-bold tabular-nums"
                                    >
                                        {kpi.value}
                                    </p>
                                    <p
                                        style={{color: "var(--text-secondary)"}}
                                        className="text-xs"
                                    >
                                        {kpi.detail}
                                    </p>
                                </div>
                                <span
                                    style={{
                                        backgroundColor: "var(--accent-subtle)",
                                        color: "var(--accent-primary)",
                                    }}
                                    className="p-2.5 rounded-xl shrink-0"
                                >
                                    {icons[idx % icons.length]}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Core Competencies & Architectural Pillars */}
            <section
                aria-labelledby="competencies-heading"
                className="grid gap-6 lg:grid-cols-12"
            >
                <div className="lg:col-span-7 surface-card p-6 space-y-4">
                    <h2 id="competencies-heading" className="text-xl font-semibold">
                        Professional Highlights &amp; Core Competencies
                    </h2>
                    <p
                        style={{color: "var(--text-secondary)"}}
                        className="text-sm leading-relaxed"
                    >
                        {profile.summaryParagraphs[1]}
                    </p>
                    <ul className="grid gap-3 sm:grid-cols-2 pt-2">
                        {profile.coreCompetencies.map((item) => (
                            <li
                                key={item}
                                className="surface-elevated px-3.5 py-2.5 flex items-center gap-2.5 text-sm"
                            >
                                <CheckCircle2
                                    style={{color: "var(--status-success)"}}
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
                        <h2 className="text-xl font-semibold">
                            Let&apos;s Build Something Together
                        </h2>
                        <p
                            style={{color: "var(--text-secondary)"}}
                            className="text-sm leading-relaxed"
                        >
                            Whether you need architectural advisory, distributed AI/MLOps engineering, or want to connect—reach out directly or submit a structured inquiry.
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
                        Open Inquiry Form &amp; Message Log
                        <ArrowRight className="w-4 h-4" aria-hidden="true"/>
                    </Link>
                </div>
            </section>

            {/* Spotlighted Projects Preview */}
            <section aria-labelledby="spotlight-heading" className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 id="spotlight-heading" className="text-xl font-semibold">
                            Spotlighted Engineering Work
                        </h2>
                        <p
                            style={{color: "var(--text-muted)"}}
                            className="text-xs"
                        >
                            Recent platforms, compilers, and AI inference pipelines
                        </p>
                    </div>
                    <Link
                        to="/projects"
                        className="btn-secondary text-xs inline-flex items-center gap-1.5"
                    >
                        View All ({projects.length})
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true"/>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {featuredProjects.map((proj) => (
                        <article
                            key={proj.id}
                            className="surface-card p-5 flex flex-col justify-between gap-4"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="badge-accent">
                                        {proj.category}
                                    </span>
                                    <span
                                        style={{color: "var(--text-muted)"}}
                                        className="text-xs tabular-nums"
                                    >
                                        {proj.year}
                                    </span>
                                </div>
                                <h3 className="text-base font-semibold">
                                    {proj.name}
                                </h3>
                                <p
                                    style={{color: "var(--text-secondary)"}}
                                    className="text-xs leading-relaxed line-clamp-3"
                                >
                                    {proj.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {proj.tags.slice(0, 4).map((t) => (
                                    <span
                                        key={t}
                                        style={{
                                            backgroundColor: "var(--bg-elevated)",
                                            color: "var(--text-secondary)",
                                        }}
                                        className="text-xs px-2 py-0.5 rounded"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
