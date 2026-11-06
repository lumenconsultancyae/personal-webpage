"use client";

import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {
    Briefcase,
    Download,
    Mail,
    Menu,
    Moon,
    Sparkles,
    Sun,
    X,
} from "lucide-react";
import {
    PERSONAL_NAV_ITEMS,
    PRIMARY_NAV_ITEMS,
    PROFESSIONAL_NAV_ITEMS,
} from "./navItems";

export {
    PERSONAL_NAV_ITEMS,
    PRIMARY_NAV_ITEMS,
    PROFESSIONAL_NAV_ITEMS,
} from "./navItems";
export type {NavItem} from "./navItems";

export function AppShell({children}: { children: React.ReactNode }) {
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    const isPersonalRealm = location.pathname.startsWith("/personal");
    const activeRealm = isPersonalRealm ? "personal" : "professional";
    const activeTab =
        new URLSearchParams(location.search).get("tab") ?? "lifestyle";

    useEffect(() => {
        setDrawerOpen(false);
    }, [location.pathname, location.search]);

    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-theme", theme);
            document.documentElement.setAttribute("data-realm", activeRealm);
        }
    }, [theme, activeRealm]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
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

    return (
        <div
            data-theme={theme}
            data-realm={activeRealm}
            className="min-h-screen flex flex-col"
        >
            <header
                role="banner"
                className="surface-glass sticky top-0 z-40 w-full no-print"
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
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
                            className="flex items-center gap-2 font-semibold tracking-tight text-sm shrink-0 whitespace-nowrap"
                        >
                            <span
                                style={{
                                    backgroundColor: "var(--accent-primary)",
                                    color: "var(--text-inverse)",
                                }}
                                className="w-7 h-7 rounded-lg inline-flex items-center justify-center font-bold text-xs shrink-0"
                            >
                                WG
                            </span>
                            <span>Wilson Guevara</span>
                        </NavLink>

                        {/* Dedicated Realm Switcher (Professional vs. Personal) */}
                        <div
                            role="group"
                            aria-label="Page realm switcher"
                            className="hidden sm:inline-flex items-center p-0.5 rounded-lg surface-elevated ms-1 shrink-0"
                        >
                            <NavLink
                                to="/"
                                data-testid="realm-switch-professional"
                                className="px-2 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap"
                                style={{
                                    backgroundColor: !isPersonalRealm
                                        ? "var(--accent-primary)"
                                        : "transparent",
                                    color: !isPersonalRealm
                                        ? "var(--text-inverse)"
                                        : "var(--text-secondary)",
                                }}
                            >
                                <Briefcase className="w-3 h-3" aria-hidden="true"/>
                                <span>Professional</span>
                            </NavLink>
                            <NavLink
                                to="/personal"
                                data-testid="nav-link-personal"
                                className="px-2 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap"
                                style={{
                                    backgroundColor: isPersonalRealm
                                        ? "var(--accent-primary)"
                                        : "transparent",
                                    color: isPersonalRealm
                                        ? "var(--text-inverse)"
                                        : "var(--text-secondary)",
                                }}
                            >
                                <Sparkles className="w-3 h-3" aria-hidden="true"/>
                                <span>Personal</span>
                            </NavLink>
                        </div>
                    </div>

                    {/* Context-Separated Desktop Navigation */}
                    <nav
                        aria-label="Primary navigation"
                        className="hidden lg:flex items-center gap-0.5"
                    >
                        {!isPersonalRealm
                            ? PROFESSIONAL_NAV_ITEMS.map((item) => (
                                  <NavLink
                                      key={item.path}
                                      to={item.path}
                                      end={item.path === "/"}
                                      data-testid={item.testId}
                                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
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
                              ))
                            : PERSONAL_NAV_ITEMS.map((item) => {
                                  const tabKey = item.path.split("tab=")[1];
                                  const isActive = activeTab === tabKey;
                                  return (
                                      <NavLink
                                          key={item.path}
                                          to={item.path}
                                          data-testid={item.testId}
                                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                                          style={{
                                              color: isActive
                                                  ? "var(--accent-primary)"
                                                  : "var(--text-secondary)",
                                              backgroundColor: isActive
                                                  ? "var(--accent-subtle)"
                                                  : "transparent",
                                          }}
                                      >
                                          {item.icon}
                                          <span>{item.shortLabel}</span>
                                      </NavLink>
                                  );
                              })}
                    </nav>

                    {/* Utility Controls */}
                    <div className="flex items-center gap-1.5 shrink-0">
                        {isPersonalRealm && (
                            <NavLink
                                to="/contact"
                                data-testid="nav-link-contact"
                                className="btn-secondary text-xs py-1.5 px-2.5 inline-flex items-center gap-1.5 whitespace-nowrap"
                            >
                                <Mail className="w-3.5 h-3.5" aria-hidden="true"/>
                                <span className="hidden sm:inline">Contact</span>
                            </NavLink>
                        )}

                        <button
                            type="button"
                            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                            data-testid="theme-toggle"
                            onClick={toggleTheme}
                            title="Toggle dark / light theme"
                            className="btn-secondary p-1.5 inline-flex items-center justify-center"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-4 h-4" aria-hidden="true"/>
                            ) : (
                                <Moon className="w-4 h-4" aria-hidden="true"/>
                            )}
                        </button>

                        {!isPersonalRealm && (
                            <a
                                href="/FinalResume.pdf"
                                download
                                data-testid="header-download-cv"
                                className="hidden sm:inline-flex btn-primary text-xs py-1.5 px-2.5 items-center gap-1.5 whitespace-nowrap"
                            >
                                <Download className="w-3.5 h-3.5" aria-hidden="true"/>
                                <span>CV</span>
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {drawerOpen && (
                <div
                    data-testid="mobile-drawer-backdrop"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setDrawerOpen(false);
                        }
                    }}
                    style={{backgroundColor: "hsl(224 34% 4% / 0.75)"}}
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
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-base">
                                    {isPersonalRealm
                                        ? "Personal World"
                                        : "Professional Portfolio"}
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
                            className="pt-4 border-t"
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

            <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
                {children}
            </main>

            <footer
                style={{
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-muted)",
                }}
                className="border-t py-5 px-4 sm:px-6 text-xs no-print"
            >
                <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
                    <span>
                        © <span className="tabular-nums">2026</span> Wilson Guevara (@wilsonr990)
                    </span>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/lumenconsultancyae/personal-webpage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            GitHub
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
