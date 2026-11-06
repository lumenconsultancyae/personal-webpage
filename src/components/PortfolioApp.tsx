"use client";

import React, {lazy, Suspense, useEffect, useState} from "react";
import {
    BrowserRouter,
    MemoryRouter,
    Navigate,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider,
    useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import {ToastProvider} from "@/components/ui/ToastProvider";
import {AppShell} from "@/components/ui/AppShell";
import {
    RouteErrorBoundary,
    RouteSkeleton,
} from "@/components/ui/ErrorBoundary";

const OverviewRoute = lazy(() => import("@/routes/OverviewRoute"));
const JourneyRoute = lazy(() => import("@/routes/JourneyRoute"));
const ProjectsRoute = lazy(() => import("@/routes/ProjectsRoute"));
const TestimonialsRoute = lazy(() => import("@/routes/TestimonialsRoute"));
const PersonalRoute = lazy(() => import("@/routes/PersonalRoute"));
const ContactRoute = lazy(() => import("@/routes/ContactRoute"));

const HASH_ROUTE_MAP: Record<string, string> = {
    professionalHighlights: "/",
    journey: "/journey",
    projects: "/projects",
    testimonials: "/testimonials",
    aboutme: "/personal?tab=lifestyle",
    traveling: "/personal?tab=travel",
    philosophy: "/personal?tab=philosophy",
    funfacts: "/personal?tab=funfacts",
    gallery: "/personal?tab=gallery",
};

function LegacyHashRedirector() {
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof window === "undefined") return;
        const applyHash = () => {
            const rawHash = window.location.hash.replace(/^#/, "");
            if (rawHash && HASH_ROUTE_MAP[rawHash]) {
                navigate(HASH_ROUTE_MAP[rawHash], {replace: true});
            }
        };
        applyHash();
        window.addEventListener("hashchange", applyHash);
        return () => window.removeEventListener("hashchange", applyHash);
    }, [navigate]);

    return null;
}

export function PortfolioRoutes() {
    const {reset} = useQueryErrorResetBoundary();

    return (
        <AppShell>
            <LegacyHashRedirector/>
            <RouteErrorBoundary onReset={reset}>
                <Suspense fallback={<RouteSkeleton rows={4}/>}>
                    <Routes>
                        <Route path="/" element={<OverviewRoute/>}/>
                        <Route path="/journey" element={<JourneyRoute/>}/>
                        <Route path="/projects" element={<ProjectsRoute/>}/>
                        <Route
                            path="/testimonials"
                            element={<TestimonialsRoute/>}
                        />
                        <Route path="/personal" element={<PersonalRoute/>}/>
                        <Route path="/contact" element={<ContactRoute/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/" replace/>}
                        />
                    </Routes>
                </Suspense>
            </RouteErrorBoundary>
        </AppShell>
    );
}

export function createPortfolioQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30_000,
                retry: false,
                refetchOnWindowFocus: false,
            },
        },
    });
}

export interface PortfolioAppProps {
    initialEntries?: string[];
    queryClient?: QueryClient;
    basename?: string;
}

export default function PortfolioApp({
    initialEntries,
    queryClient: externalClient,
    basename,
}: PortfolioAppProps) {
    const [defaultClient] = useState(() => createPortfolioQueryClient());
    const activeClient = externalClient ?? defaultClient;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const useMemory =
        Boolean(initialEntries) || typeof window === "undefined" || !mounted;

    return (
        <QueryClientProvider client={activeClient}>
            <ToastProvider>
                {useMemory ? (
                    <MemoryRouter
                        initialEntries={initialEntries ?? ["/"]}
                        basename={basename}
                    >
                        <PortfolioRoutes/>
                    </MemoryRouter>
                ) : (
                    <BrowserRouter basename={basename}>
                        <PortfolioRoutes/>
                    </BrowserRouter>
                )}
            </ToastProvider>
        </QueryClientProvider>
    );
}
