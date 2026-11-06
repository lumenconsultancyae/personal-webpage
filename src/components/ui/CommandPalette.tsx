"use client";

import React, {useEffect, useMemo, useRef, useState} from "react";
import {
    Briefcase,
    Code2,
    Command,
    Compass,
    FileDown,
    Home,
    Languages,
    Mail,
    MessageSquareQuote,
    Search,
    SunMoon,
    X,
} from "lucide-react";

export interface CommandAction {
    id: string;
    label: string;
    category: "Navigation" | "Actions";
    shortcut?: string;
    icon: React.ReactNode;
    onSelect: () => void;
}

export interface CommandPaletteProps {
    open: boolean;
    onClose: () => void;
    onNavigate: (path: string) => void;
    onToggleTheme: () => void;
    onToggleDirection: () => void;
}

export function CommandPalette({
    open,
    onClose,
    onNavigate,
    onToggleTheme,
    onToggleDirection,
}: CommandPaletteProps) {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const actions: CommandAction[] = useMemo(
        () => [
            {
                id: "nav-overview",
                label: "Go to Executive Overview & Highlights",
                category: "Navigation",
                shortcut: "G H",
                icon: <Home className="w-4 h-4" aria-hidden="true"/>,
                onSelect: () => onNavigate("/"),
            },
            {
                id: "nav-journey",
                label: "Go to Career Journey & Education Timeline",
                category: "Navigation",
                shortcut: "G J",
                icon: <Briefcase className="w-4 h-4" aria-hidden="true"/>,
                onSelect: () => onNavigate("/journey"),
            },
            {
                id: "nav-projects",
                label: "Go to Projects & Engineering Explorer",
                category: "Navigation",
                shortcut: "G P",
                icon: <Code2 className="w-4 h-4" aria-hidden="true"/>,
                onSelect: () => onNavigate("/projects"),
            },
            {
                id: "nav-testimonials",
                label: "Go to Testimonials & Technical Skills Matrix",
                category: "Navigation",
                shortcut: "G T",
                icon: <MessageSquareQuote className="w-4 h-4" aria-hidden="true"/>,
                onSelect: () => onNavigate("/testimonials"),
            },
            {
                id: "nav-personal",
                label: "Go to Personal Life, Travel & Photo Gallery",
                category: "Navigation",
                shortcut: "G L",
                icon: <Compass className="w-4 h-4" aria-hidden="true"/>,
                onSelect: () => onNavigate("/personal"),
            },
            {
                id: "nav-contact",
                label: "Go to Contact & Direct Inquiries",
                category: "Navigation",
                shortcut: "G C",
                icon: <Mail className="w-4 h-4" aria-hidden="true"/>,
                onSelect: () => onNavigate("/contact"),
            },
            {
                id: "act-new-project",
                label: "Create New Project in Showcase",
                category: "Actions",
                shortcut: "N P",
                icon: <Code2 className="w-4 h-4" aria-hidden="true"/>,
                onSelect: () => onNavigate("/projects?create=1"),
            },
            {
                id: "act-theme",
                label: "Toggle Dark / Light Appearance",
                category: "Actions",
                shortcut: "T M",
                icon: <SunMoon className="w-4 h-4" aria-hidden="true"/>,
                onSelect: () => onToggleTheme(),
            },
            {
                id: "act-dir",
                label: "Toggle LTR / RTL Reading Direction",
                category: "Actions",
                shortcut: "T D",
                icon: <Languages className="w-4 h-4" aria-hidden="true"/>,
                onSelect: () => onToggleDirection(),
            },
            {
                id: "act-cv",
                label: "Download Full Resume (FinalResume.pdf)",
                category: "Actions",
                shortcut: "D R",
                icon: <FileDown className="w-4 h-4" aria-hidden="true"/>,
                onSelect: () => {
                    window.open("/FinalResume.pdf", "_blank", "noopener,noreferrer");
                },
            },
        ],
        [onNavigate, onToggleDirection, onToggleTheme]
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return actions;
        return actions.filter(
            (a) =>
                a.label.toLowerCase().includes(q) ||
                a.category.toLowerCase().includes(q)
        );
    }, [actions, query]);

    useEffect(() => {
        if (open) {
            setQuery("");
            setActiveIndex(0);
            const raf = requestAnimationFrame(() => {
                inputRef.current?.focus();
            });
            return () => cancelAnimationFrame(raf);
        }
    }, [open]);

    useEffect(() => {
        setActiveIndex(0);
    }, [query]);

    if (!open) return null;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault();
            onClose();
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) =>
                filtered.length > 0 ? (prev + 1) % filtered.length : 0
            );
            return;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) =>
                filtered.length > 0
                    ? (prev - 1 + filtered.length) % filtered.length
                    : 0
            );
            return;
        }
        if (e.key === "Enter" && filtered[activeIndex]) {
            e.preventDefault();
            filtered[activeIndex].onSelect();
            onClose();
        }
    };

    return (
        <div
            data-testid="command-palette-backdrop"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
            style={{backgroundColor: "hsl(222 47% 4% / 0.72)"}}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 backdrop-blur-sm no-print"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                data-testid="command-palette"
                onKeyDown={handleKeyDown}
                className="surface-card w-full max-w-xl overflow-hidden"
            >
                <div
                    style={{borderColor: "var(--border-subtle)"}}
                    className="flex items-center gap-3 px-4 py-3 border-b"
                >
                    <Search
                        style={{color: "var(--text-muted)"}}
                        className="w-4 h-4 shrink-0"
                        aria-hidden="true"
                    />
                    <input
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type a command or route to jump..."
                        aria-label="Search commands and routes"
                        data-testid="command-palette-input"
                        className="w-full bg-transparent text-sm focus:outline-none"
                    />
                    <kbd className="kbd-hint">Esc</kbd>
                    <button
                        type="button"
                        aria-label="Close command palette"
                        onClick={onClose}
                        style={{color: "var(--text-muted)"}}
                        className="p-1 rounded hover:opacity-80"
                    >
                        <X className="w-4 h-4" aria-hidden="true"/>
                    </button>
                </div>

                <div
                    role="listbox"
                    aria-label="Available commands"
                    className="max-h-80 overflow-y-auto p-2 space-y-1"
                >
                    {filtered.length === 0 ? (
                        <p
                            style={{color: "var(--text-muted)"}}
                            className="p-6 text-center text-sm"
                        >
                            No matching commands found for &ldquo;{query}&rdquo;.
                        </p>
                    ) : (
                        filtered.map((item, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    role="option"
                                    aria-selected={isActive}
                                    data-testid={`command-item-${item.id}`}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    onClick={() => {
                                        item.onSelect();
                                        onClose();
                                    }}
                                    style={{
                                        backgroundColor: isActive
                                            ? "var(--bg-interactive)"
                                            : "transparent",
                                    }}
                                    className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-start"
                                >
                                    <span className="flex items-center gap-2.5">
                                        <span style={{color: "var(--accent-primary)"}}>
                                            {item.icon}
                                        </span>
                                        <span>{item.label}</span>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span
                                            style={{color: "var(--text-muted)"}}
                                            className="text-xs"
                                        >
                                            {item.category}
                                        </span>
                                        {item.shortcut && (
                                            <kbd className="kbd-hint">{item.shortcut}</kbd>
                                        )}
                                    </span>
                                </button>
                            );
                        })
                    )}
                </div>

                <div
                    style={{
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-muted)",
                    }}
                    className="px-4 py-2 border-t text-xs flex items-center justify-between"
                >
                    <span className="inline-flex items-center gap-1.5">
                        <Command className="w-3.5 h-3.5" aria-hidden="true"/>
                        Use <kbd className="kbd-hint">↑</kbd> <kbd className="kbd-hint">↓</kbd> to navigate,{" "}
                        <kbd className="kbd-hint">Enter</kbd> to select
                    </span>
                    <span className="tabular-nums">{filtered.length} commands</span>
                </div>
            </div>
        </div>
    );
}
