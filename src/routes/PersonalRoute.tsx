"use client";

import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {
    BookOpen,
    Film,
    Languages,
    MapPin,
    Music,
    Plane,
    Puzzle,
    Quote,
    Sparkles,
    X,
} from "lucide-react";
import type {GalleryItem} from "@/domain/models";
import {useProfileOverviewQuery} from "@/application/usePortfolioQueries";
import {PERSONAL_BLOG_POSTS} from "@/infrastructure/blogPosts";
import {BlogFeedSection} from "@/components/ui/BlogFeedSection";
import {RouteSkeleton} from "@/components/ui/ErrorBoundary";

const LIFESTYLE_ICONS = {
    puzzle: <Puzzle className="w-3.5 h-3.5" aria-hidden="true"/>,
    languages: <Languages className="w-3.5 h-3.5" aria-hidden="true"/>,
    plane: <Plane className="w-3.5 h-3.5" aria-hidden="true"/>,
    music: <Music className="w-3.5 h-3.5" aria-hidden="true"/>,
    book: <BookOpen className="w-3.5 h-3.5" aria-hidden="true"/>,
    film: <Film className="w-3.5 h-3.5" aria-hidden="true"/>,
} as const;

const TRAVEL_IMAGES: Record<string, string> = {
    "travel-colombia": "/gallery/colombia-cocora.png",
    "travel-singapore": "/gallery/singapore-skyline.png",
    "travel-uae": "/gallery/dubai-chapter.png",
    "travel-next": "/gallery/family-moment.png",
};

export default function PersonalRoute() {
    const {data: profile, isLoading} = useProfileOverviewQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    const rawTab = searchParams.get("tab") ?? "lifestyle";
    const activeTab = rawTab === "all" ? "lifestyle" : rawTab;
    const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

    if (isLoading || !profile) {
        return <RouteSkeleton rows={3}/>;
    }

    const tabs = [
        {id: "lifestyle", label: "Personal Blog (Games, Movies & Music)"},
        {id: "travel", label: "Where I've Lived"},
        {id: "philosophy", label: "Philosophy"},
        {id: "funfacts", label: "10 Fun Facts"},
        {id: "gallery", label: "Photo Gallery"},
    ] as const;

    const selectTab = (id: string) => {
        const next = new URLSearchParams(searchParams);
        if (id === "lifestyle") {
            next.delete("tab");
        } else {
            next.set("tab", id);
        }
        setSearchParams(next);
    };

    return (
        <div data-testid="personal-route" className="space-y-3">
            {/* Compact Header + Animated Section Switcher */}
            <div className="surface-card p-3 sm:p-3.5 flex flex-wrap items-center justify-between gap-2.5">
                <div className="min-w-0">
                    <h1 className="text-base sm:text-lg font-bold tracking-tight">
                        Beyond the Keyboard — Personal Blog &amp; Curated World
                    </h1>
                    <p
                        style={{color: "var(--text-secondary)"}}
                        className="text-xs truncate"
                    >
                        Favorite board games (@bgameplan), favorite movies, favorite music, fatherhood &amp; global chapters
                    </p>
                </div>

                <div
                    role="tablist"
                    aria-label="Personal page sections"
                    className="flex flex-wrap gap-1"
                >
                    {tabs.map((tab) => {
                        const isCurrent = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={isCurrent}
                                data-testid={`personal-tab-${tab.id}`}
                                onClick={() => selectTab(tab.id)}
                                className={
                                    isCurrent
                                        ? "btn-primary text-[11px] py-1 px-2.5"
                                        : "btn-secondary text-[11px] py-1 px-2.5"
                                }
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Single-Stage Animated Content Deck (Minimal Scroll) */}
            <AnimatePresence initial={false}>
                {activeTab === "lifestyle" && (
                    <motion.div
                        key="tab-lifestyle"
                        initial={{opacity: 0, y: 14}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -12}}
                        transition={{type: "spring", stiffness: 260, damping: 24}}
                        className="space-y-2.5"
                    >
                        <BlogFeedSection
                            heading="Personal Blog: Board Games, Movies, Music & Life"
                            subheading="Select a topic on the left to read my notes on tabletop strategy (@bgameplan), cinema, coding playlists, and coffee"
                            posts={PERSONAL_BLOG_POSTS}
                            testIdPrefix="personal"
                        />

                        {/* Compact Single-Row Passions Pill Bar */}
                        <div className="flex flex-wrap items-center gap-1.5">
                            {profile.lifestyle.map((item) => (
                                <span
                                    key={item.id}
                                    title={item.desc}
                                    className="surface-card px-2.5 py-1 text-[11px] font-medium inline-flex items-center gap-1.5"
                                >
                                    <span style={{color: "var(--accent-primary)"}}>
                                        {LIFESTYLE_ICONS[item.iconName]}
                                    </span>
                                    <span>{item.title}</span>
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === "travel" && (
                    <motion.section
                        key="tab-travel"
                        aria-labelledby="travel-heading"
                        initial={{opacity: 0, y: 14}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -12}}
                        transition={{type: "spring", stiffness: 260, damping: 24}}
                        className="space-y-3"
                    >
                        <h2 id="travel-heading" className="text-base font-semibold">
                            Where I&apos;ve Lived — Every Place Tells a Story
                        </h2>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {profile.travel.map((stop) => (
                                <article
                                    key={stop.id}
                                    className="surface-card overflow-hidden flex flex-col justify-between"
                                >
                                    <img
                                        src={
                                            TRAVEL_IMAGES[stop.id] ??
                                            "/gallery/colombia-cocora.png"
                                        }
                                        alt={`${stop.city}, ${stop.country}`}
                                        width={400}
                                        height={160}
                                        className="w-full h-32 object-cover"
                                    />
                                    <div className="p-3 space-y-1.5 flex-1">
                                        <div className="flex items-center justify-between gap-1.5">
                                            <span
                                                style={{
                                                    color: "var(--accent-primary)",
                                                }}
                                                className="font-semibold text-xs inline-flex items-center gap-1"
                                            >
                                                <MapPin
                                                    className="w-3.5 h-3.5 shrink-0"
                                                    aria-hidden="true"
                                                />
                                                {stop.city}, {stop.country}
                                            </span>
                                            <span className="badge-accent tabular-nums text-[10px]">
                                                {stop.period}
                                            </span>
                                        </div>
                                        <p
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                            className="text-xs leading-relaxed"
                                        >
                                            {stop.note}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </motion.section>
                )}

                {activeTab === "philosophy" && (
                    <motion.section
                        key="tab-philosophy"
                        aria-labelledby="philosophy-heading"
                        initial={{opacity: 0, y: 14}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -12}}
                        transition={{type: "spring", stiffness: 260, damping: 24}}
                        className="space-y-3"
                    >
                        <h2
                            id="philosophy-heading"
                            className="text-base font-semibold"
                        >
                            Engineering &amp; Life Philosophy
                        </h2>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {profile.philosophies.map((phil) => (
                                <article
                                    key={phil.id}
                                    className="surface-card p-4 space-y-1.5"
                                >
                                    <div
                                        style={{color: "var(--accent-primary)"}}
                                        className="font-semibold text-sm flex items-center gap-2"
                                    >
                                        <Quote
                                            className="w-4 h-4 shrink-0"
                                            aria-hidden="true"
                                        />
                                        <span>{phil.quote}</span>
                                    </div>
                                    <p
                                        style={{color: "var(--text-secondary)"}}
                                        className="text-xs sm:text-sm leading-relaxed"
                                    >
                                        {phil.context}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </motion.section>
                )}

                {activeTab === "funfacts" && (
                    <motion.section
                        key="tab-funfacts"
                        aria-labelledby="funfacts-heading"
                        initial={{opacity: 0, y: 14}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -12}}
                        transition={{type: "spring", stiffness: 260, damping: 24}}
                        className="space-y-3"
                    >
                        <h2 id="funfacts-heading" className="text-base font-semibold">
                            10 Fun Facts About Me
                        </h2>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {profile.funFacts.map((item) => (
                                <div
                                    key={item.id}
                                    className="surface-card p-3 flex items-start gap-2.5"
                                >
                                    <span className="badge-accent tabular-nums shrink-0 text-[10px]">
                                        #{item.order}
                                    </span>
                                    <p
                                        style={{color: "var(--text-secondary)"}}
                                        className="text-xs"
                                    >
                                        {item.fact}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {activeTab === "gallery" && (
                    <motion.section
                        key="tab-gallery"
                        aria-labelledby="gallery-heading"
                        initial={{opacity: 0, y: 14}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -12}}
                        transition={{type: "spring", stiffness: 260, damping: 24}}
                        className="space-y-3"
                    >
                        <h2
                            id="gallery-heading"
                            className="text-base font-semibold inline-flex items-center gap-2"
                        >
                            <Sparkles
                                style={{color: "var(--accent-primary)"}}
                                className="w-4 h-4"
                                aria-hidden="true"
                            />
                            Snapshots &amp; Photo Gallery (Click any photo to enlarge)
                        </h2>
                        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                            {profile.gallery.map((img) => (
                                <button
                                    key={img.id}
                                    type="button"
                                    data-testid={`gallery-card-${img.id}`}
                                    onClick={() => setLightboxItem(img)}
                                    className="surface-card overflow-hidden text-start flex flex-col justify-between group hover:opacity-95 transition"
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        width={360}
                                        height={180}
                                        className="w-full h-28 object-cover"
                                    />
                                    <div className="p-2 space-y-0.5">
                                        <span className="badge-accent text-[10px]">
                                            {img.category}
                                        </span>
                                        <p
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                            className="text-[11px] leading-snug line-clamp-2"
                                        >
                                            {img.caption}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Compact Snapshots Strip when viewing non-gallery tabs */}
            {activeTab !== "gallery" && (
                <section
                    aria-label="Snapshots quick strip"
                    className="surface-card p-2.5 space-y-1.5"
                >
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold inline-flex items-center gap-1.5">
                            <Sparkles
                                style={{color: "var(--accent-primary)"}}
                                className="w-3 h-3"
                                aria-hidden="true"
                            />
                            Snapshots &amp; Life Gallery (Click any photo to enlarge)
                        </span>
                        <button
                            type="button"
                            onClick={() => selectTab("gallery")}
                            className="btn-secondary text-[10px] py-0.5 px-2"
                        >
                            Expand Gallery
                        </button>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                        {profile.gallery.map((img) => (
                            <button
                                key={img.id}
                                type="button"
                                data-testid={`gallery-card-${img.id}`}
                                onClick={() => setLightboxItem(img)}
                                title={img.caption}
                                className="overflow-hidden rounded-lg border transition hover:scale-[1.03] cursor-pointer"
                                style={{borderColor: "var(--border-subtle)"}}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    width={120}
                                    height={70}
                                    className="w-full h-11 sm:h-12 object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Accessible Lightbox Modal */}
            {lightboxItem && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={lightboxItem.alt}
                    data-testid="gallery-lightbox"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setLightboxItem(null);
                        }
                    }}
                    style={{backgroundColor: "hsl(222 47% 4% / 0.8)"}}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm no-print"
                >
                    <div className="surface-card max-w-2xl w-full p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="badge-accent">
                                {lightboxItem.category}
                            </span>
                            <button
                                type="button"
                                aria-label="Close photo preview"
                                data-testid="gallery-lightbox-close"
                                onClick={() => setLightboxItem(null)}
                                className="btn-secondary p-1.5"
                            >
                                <X className="w-4 h-4" aria-hidden="true"/>
                            </button>
                        </div>
                        <img
                            src={lightboxItem.src}
                            alt={lightboxItem.alt}
                            className="w-full max-h-96 object-contain rounded-lg"
                        />
                        <p className="text-sm font-medium text-center">
                            {lightboxItem.caption}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
