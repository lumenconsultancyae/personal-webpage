"use client";

import React, {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Briefcase, GraduationCap, MapPin, Search, X} from "lucide-react";
import {useProfileOverviewQuery} from "@/application/usePortfolioQueries";
import {
    ContextualEmptyState,
    RouteSkeleton,
} from "@/components/ui/ErrorBoundary";
import {PaginationControls} from "@/components/ui/PaginationControls";

export default function JourneyRoute() {
    const {data: profile, isLoading} = useProfileOverviewQuery();
    const [searchParams, setSearchParams] = useSearchParams();

    const typeFilter = searchParams.get("type") ?? "all";
    const urlQuery = searchParams.get("q") ?? "";
    const pageParam = Number(searchParams.get("page") ?? "1") || 1;
    const pageSizeParam = Number(searchParams.get("pageSize") ?? "10") || 10;

    const [searchInput, setSearchInput] = useState(urlQuery);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        setSearchInput(urlQuery);
    }, [urlQuery]);

    // Debounce search query synchronization into URL search params
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput !== urlQuery) {
                const next = new URLSearchParams(searchParams);
                if (searchInput.trim()) {
                    next.set("q", searchInput.trim());
                } else {
                    next.delete("q");
                }
                next.set("page", "1");
                setSearchParams(next, {replace: true});
            }
        }, 200);
        return () => clearTimeout(timer);
    }, [searchInput, urlQuery, searchParams, setSearchParams]);

    const updateParam = (key: string, value: string) => {
        const next = new URLSearchParams(searchParams);
        if (!value || value === "all") {
            next.delete(key);
        } else {
            next.set(key, value);
        }
        if (key !== "page") {
            next.set("page", "1");
        }
        setSearchParams(next);
    };

    const clearFilters = () => {
        setSearchInput("");
        setSearchParams(new URLSearchParams());
    };

    const filteredEntries = useMemo(() => {
        const entries = profile?.journey ?? [];
        return entries.filter((entry) => {
            if (typeFilter !== "all" && entry.type !== typeFilter) {
                return false;
            }
            if (urlQuery.trim()) {
                const q = urlQuery.toLowerCase();
                const haystack = `${entry.title} ${entry.organization} ${entry.location} ${entry.details}`.toLowerCase();
                if (!haystack.includes(q)) {
                    return false;
                }
            }
            return true;
        });
    }, [profile?.journey, typeFilter, urlQuery]);

    if (isLoading || !profile) {
        return <RouteSkeleton rows={4}/>;
    }

    const totalItems = filteredEntries.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSizeParam));
    const safePage = Math.min(Math.max(1, pageParam), totalPages);
    const pagedEntries = filteredEntries.slice(
        (safePage - 1) * pageSizeParam,
        safePage * pageSizeParam
    );

    const activeEntry =
        filteredEntries.find((e) => e.id === selectedId) ??
        pagedEntries[0] ??
        null;

    return (
        <div data-testid="journey-route" className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Career Journey &amp; Education
                    </h1>
                    <p
                        style={{color: "var(--text-secondary)"}}
                        className="text-sm mt-1"
                    >
                        12+ years of engineering leadership across Colombia, Singapore, and the UAE
                    </p>
                </div>

                <div
                    role="group"
                    aria-label="Filter journey by type"
                    className="flex items-center gap-1.5"
                >
                    {[
                        {id: "all", label: "All Milestones"},
                        {id: "work", label: "Work Experience"},
                        {id: "education", label: "Education"},
                    ].map((tab) => {
                        const active = typeFilter === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                data-testid={`journey-filter-${tab.id}`}
                                onClick={() => updateParam("type", tab.id)}
                                className={
                                    active
                                        ? "btn-primary text-xs"
                                        : "btn-secondary text-xs"
                                }
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="surface-card p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[240px]">
                    <Search
                        style={{color: "var(--text-muted)"}}
                        className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                    />
                    <input
                        type="search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search roles, companies, cities, or technologies..."
                        aria-label="Search career journey"
                        data-testid="journey-search-input"
                        className="input-control input-control-search text-sm"
                    />
                </div>

                {(typeFilter !== "all" || urlQuery) && (
                    <button
                        type="button"
                        data-testid="journey-clear-filters"
                        onClick={clearFilters}
                        className="btn-secondary text-xs inline-flex items-center gap-1.5"
                    >
                        <X className="w-3.5 h-3.5" aria-hidden="true"/>
                        Clear Filters
                    </button>
                )}
            </div>

            {filteredEntries.length === 0 ? (
                <ContextualEmptyState
                    kind="no-matches"
                    title="No timeline milestones match your filter"
                    description="Try clearing the search query or switching back to All Milestones."
                    actionLabel="Clear Filters"
                    onAction={clearFilters}
                />
            ) : (
                <div className="grid gap-6 lg:grid-cols-12 items-start">
                    {/* Bounded Scroll Table of Milestones */}
                    <div className="lg:col-span-7 space-y-3">
                        <div
                            data-testid="journey-table-container"
                            className="bounded-table-container"
                        >
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                            Role / Degree
                                        </th>
                                        <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                            Organization
                                        </th>
                                        <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                            Period
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagedEntries.map((item) => {
                                        const isSelected =
                                            activeEntry?.id === item.id;
                                        return (
                                            <tr
                                                key={item.id}
                                                data-testid={`journey-row-${item.id}`}
                                                onClick={() =>
                                                    setSelectedId(item.id)
                                                }
                                                style={{
                                                    borderColor:
                                                        "var(--border-subtle)",
                                                    backgroundColor: isSelected
                                                        ? "var(--accent-subtle)"
                                                        : "transparent",
                                                }}
                                                className="border-b cursor-pointer transition-colors hover:opacity-90"
                                            >
                                                <td className="py-3 px-4 font-medium">
                                                    <div className="flex items-center gap-2">
                                                        {item.type === "work" ? (
                                                            <Briefcase
                                                                style={{
                                                                    color: "var(--accent-primary)",
                                                                }}
                                                                className="w-4 h-4 shrink-0"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <GraduationCap
                                                                style={{
                                                                    color: "var(--accent-secondary)",
                                                                }}
                                                                className="w-4 h-4 shrink-0"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                        <span>{item.title}</span>
                                                    </div>
                                                </td>
                                                <td
                                                    style={{
                                                        color: "var(--text-secondary)",
                                                    }}
                                                    className="py-3 px-4"
                                                >
                                                    {item.organization}
                                                </td>
                                                <td
                                                    style={{
                                                        color: "var(--text-muted)",
                                                    }}
                                                    className="py-3 px-4 tabular-nums whitespace-nowrap text-xs"
                                                >
                                                    {item.duration}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <PaginationControls
                            totalItems={totalItems}
                            page={safePage}
                            pageSize={pageSizeParam}
                            onPageChange={(nextPage) =>
                                updateParam("page", String(nextPage))
                            }
                            onPageSizeChange={(nextSize) => {
                                const next = new URLSearchParams(searchParams);
                                next.set("pageSize", String(nextSize));
                                next.set("page", "1");
                                setSearchParams(next);
                            }}
                            itemLabel="milestones"
                        />
                    </div>

                    {/* Inspector Panel for Selected Milestone */}
                    {activeEntry && (
                        <aside
                            aria-label="Selected milestone details"
                            data-testid="journey-detail-panel"
                            className="lg:col-span-5 surface-card overflow-hidden flex flex-col"
                        >
                            <img
                                src={
                                    activeEntry.location.includes("UAE")
                                        ? "/gallery/dubai-chapter.png"
                                        : activeEntry.location.includes(
                                              "Singapore"
                                          )
                                          ? "/gallery/singapore-skyline.png"
                                          : activeEntry.location.includes(
                                                "Colombia"
                                            )
                                            ? "/gallery/colombia-cocora.png"
                                            : "/gallery/dev-workspace.png"
                                }
                                alt={activeEntry.location}
                                width={500}
                                height={200}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="badge-accent uppercase">
                                        {activeEntry.type === "work"
                                            ? "Work Experience"
                                            : "Education"}
                                    </span>
                                    <span
                                        style={{color: "var(--text-muted)"}}
                                        className="text-xs tabular-nums"
                                    >
                                        {activeEntry.duration}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h2 className="text-xl font-semibold">
                                        {activeEntry.title}
                                    </h2>
                                    <p
                                        style={{color: "var(--accent-primary)"}}
                                        className="text-sm font-medium"
                                    >
                                        {activeEntry.organization}
                                    </p>
                                    <p
                                        style={{color: "var(--text-muted)"}}
                                        className="text-xs inline-flex items-center gap-1"
                                    >
                                        <MapPin
                                            className="w-3.5 h-3.5"
                                            aria-hidden="true"
                                        />
                                        {activeEntry.location}
                                    </p>
                                </div>

                                <p
                                    style={{color: "var(--text-secondary)"}}
                                    className="text-sm leading-relaxed"
                                >
                                    {activeEntry.details}
                                </p>

                                {activeEntry.type === "work" &&
                                    activeEntry.highlights.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-2">
                                            {activeEntry.highlights.map(
                                                (tag) => (
                                                    <span
                                                        key={tag}
                                                        className="surface-elevated px-2.5 py-1 text-xs"
                                                    >
                                                        {tag}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        </aside>
                    )}
                </div>
            )}
        </div>
    );
}
