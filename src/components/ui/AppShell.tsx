"use client";

import React, {useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {
    Briefcase,
    Code2,
    Command,
    Compass,
    Download,
    Home,
    Languages,
    Mail,
    Menu,
    MessageSquareQuote,
    Moon,
    Sun,
    X,
} from "lucide-react";
import {CommandPalette} from "./CommandPalette";

export interface NavItem {
    path: string;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    testId: string;
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
    {
        path: "/",
        label: "Executive Overview",
        shortLabel: "Overview",
        icon: <Home className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-overview",
    },
    {
        path: "/journey",
        label: "Career & Education",
        shortLabel: "Journey",
        icon: <Briefcase className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-journey",
    },
    {
        path: "/projects",
        label: "Projects Explorer",
        shortLabel: "Projects",
        icon: <Code2 className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-projects",
    },
    {
        path: "/testimonials",
        label: "Testimonials & Skills",
        shortLabel: "Testimonials",
        icon: <MessageSquareQuote className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-testimonials",
    },
    {
        path: "/personal",
        label: "Personal & Gallery",
        shortLabel: "Personal",
        icon: <Compass className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-personal",
    },
    {
        path: "/contact",
        label: "Contact & Inquiries",
        shortLabel: "Contact",
        icon: <Mail className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-contact",
    },
];

export function AppShell({children}: { children: React.ReactNode }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

    // Auto-close responsive off-canvas navigation drawer on route or search change
    useEffect(() => {
        setDrawerOpen(false);
    }, [location.pathname, location.search]);

    // Sync theme and LTR/RTL attributes onto documentElement
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-theme", theme);
            document.documentElement.setAttribute("dir", direction);
        }
    }, [theme, direction]);

    // Global keyboard shortcuts: Cmd/Ctrl + K for command palette, Escape for drawer
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setPaletteOpen((prev) => !prev);
                return;
            }
            if (e.key === "Escape" && drawerOpen) {
                e.preventDefault();
                setDrawerOpen(false);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [drawerOpen]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    const toggleDirection = () =>
        setDirection((prev) => (prev === "ltr" ? "rtl" : "ltr"));

    return (
        <div
            dir={direction}
            data-theme={theme}
            className="min-h-screen flex flex-col"
        >
            <header
                role="banner"
                className="surface-glass sticky top-0 z-40 w-full no-print"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            aria-label={
                                drawerOpen
                                    ? "Close navigation menu"
                                    : "Open navigation menu"
                            }
                            aria-expanded={drawerOpen}
                            aria-controls="mobile-navigation-drawer"
                            data-testid="mobile-menu-toggle"
                            onClick={() => setDrawerOpen((prev) => !prev)}
                            className="lg:hidden btn-secondary p-2 inline-flex items-center justify-center"
                        >
                            {drawerOpen ? (
                                <X className="w-5 h-5" aria-hidden="true"/>
                            ) : (
                                <Menu className="w-5 h-5" aria-hidden="true"/>
                            )}
                        </button>

                        <NavLink
                            to="/"
                            data-testid="brand-home-link"
                            className="flex items-center gap-2.5 font-semibold tracking-tight text-base sm:text-lg"
                        >
                            <span
                                style={{
                                    backgroundColor: "var(--accent-primary)",
                                    color: "var(--text-inverse)",
                                }}
                                className="w-8 h-8 rounded-lg inline-flex items-center justify-center font-bold text-sm shrink-0"
                            >
                                WG
                            </span>
                            <span className="truncate">Wilson Guevara</span>
                        </NavLink>
                    </div>

                    {/* Desktop Primary Navigation */}
                    <nav
                        aria-label="Primary navigation"
                        className="hidden lg:flex items-center gap-1"
                    >
                        {PRIMARY_NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}
                                data-testid={item.testId}
                                className={({isActive}) =>
                                    `px-3 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-1.5 transition-colors ${
                                        isActive
                                            ? "badge-accent"
                                            : "hover:opacity-90"
                                    }`
                                }
                                style={({isActive}) => ({
                                    color: isActive
                                        ? "var(--accent-primary)"
                                        : "var(--text-secondary)",
                                    backgroundColor: isActive
                                        ? "var(--accent-subtle)"
                                        : "transparent",
                                })}
                            >
                                {item.icon}
                                <span>{item.shortLabel}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Utility Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            aria-label="Open command palette"
                            data-testid="command-palette-trigger"
                            onClick={() => setPaletteOpen(true)}
                            className="btn-secondary text-xs py-1.5 px-2.5 inline-flex items-center gap-2"
                        >
                            <Command className="w-3.5 h-3.5" aria-hidden="true"/>
                            <span className="hidden sm:inline">Quick Jump</span>
                            <kbd className="kbd-hint">⌘K</kbd>
                        </button>

                        <button
                            type="button"
                            aria-label={`Switch to ${direction === "ltr" ? "RTL" : "LTR"} layout`}
                            data-testid="direction-toggle"
                            onClick={toggleDirection}
                            title="Toggle LTR / RTL direction"
                            className="btn-secondary p-2 text-xs inline-flex items-center gap-1"
                        >
                            <Languages className="w-4 h-4" aria-hidden="true"/>
                            <span className="sr-only sm:not-sr-only uppercase">
                                {direction}
                            </span>
                        </button>

                        <button
                            type="button"
                            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                            data-testid="theme-toggle"
                            onClick={toggleTheme}
                            title="Toggle dark / light theme"
                            className="btn-secondary p-2 inline-flex items-center justify-center"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-4 h-4" aria-hidden="true"/>
                            ) : (
                                <Moon className="w-4 h-4" aria-hidden="true"/>
                            )}
                        </button>

                        <a
                            href="/FinalResume.pdf"
                            download
                            data-testid="header-download-cv"
                            className="hidden sm:inline-flex btn-primary text-xs py-1.5 px-3 items-center gap-1.5"
                        >
                            <Download className="w-3.5 h-3.5" aria-hidden="true"/>
                            <span>CV</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Off-Canvas Responsive Navigation Drawer (Tablet/Mobile <= 1024px) */}
            {drawerOpen && (
                <div
                    data-testid="mobile-drawer-backdrop"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setDrawerOpen(false);
                        }
                    }}
                    style={{backgroundColor: "hsl(222 47% 4% / 0.72)"}}
                    className="fixed inset-0 z-50 lg:hidden backdrop-blur-sm no-print"
                >
                    <aside
                        id="mobile-navigation-drawer"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation drawer"
                        data-testid="mobile-navigation-drawer"
                        style={{
                            backgroundColor: "var(--bg-surface)",
                            borderColor: "var(--border-subtle)",
                        }}
                        className="w-72 max-w-[85vw] h-full border-e p-5 flex flex-col justify-between"
                    >
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-base">
                                    Navigation
                                </span>
                                <button
                                    type="button"
                                    aria-label="Close drawer"
                                    data-testid="mobile-drawer-close"
                                    onClick={() => setDrawerOpen(false)}
                                    className="btn-secondary p-1.5"
                                >
                                    <X className="w-4 h-4" aria-hidden="true"/>
                                </button>
                            </div>

                            <nav
                                aria-label="Mobile routes"
                                className="flex flex-col gap-1.5"
                            >
                                {PRIMARY_NAV_ITEMS.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={item.path === "/"}
                                        data-testid={`drawer-${item.testId}`}
                                        onClick={() => setDrawerOpen(false)}
                                        className="px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2.5 transition-colors"
                                        style={({isActive}) => ({
                                            color: isActive
                                                ? "var(--accent-primary)"
                                                : "var(--text-primary)",
                                            backgroundColor: isActive
                                                ? "var(--accent-subtle)"
                                                : "transparent",
                                        })}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </NavLink>
                                ))}
                            </nav>
                        </div>

                        <div
                            style={{borderColor: "var(--border-subtle)"}}
                            className="pt-4 border-t space-y-3"
                        >
                            <a
                                href="/FinalResume.pdf"
                                download
                                className="btn-primary w-full py-2 text-sm inline-flex items-center justify-center gap-2"
                            >
                                <Download className="w-4 h-4" aria-hidden="true"/>
                                Download Full CV (PDF)
                            </a>
                        </div>
                    </aside>
                </div>
            )}

            <CommandPalette
                open={paletteOpen}
                onClose={() => setPaletteOpen(false)}
                onNavigate={(path) => navigate(path)}
                onToggleTheme={toggleTheme}
                onToggleDirection={toggleDirection}
            />

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {children}
            </main>

            <footer
                style={{
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-muted)",
                }}
                className="border-t py-6 px-4 sm:px-6 text-xs no-print"
            >
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                    <span>
                        © <span className="tabular-nums">2026</span> Wilson Guevara (@wilsonr990). Crafted with React Router, TanStack Query &amp; Semantic CSS Tokens.
                    </span>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/lumenconsultancyae/personal-webpage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            GitHub Repository
                        </a>
                        <a
                            href="https://gitlab.com/wilsonr990"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            GitLab
                        </a>
                        <a
                            href="https://www.linkedin.com/in/wilsonr990/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
