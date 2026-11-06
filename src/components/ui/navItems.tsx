import React from "react";
import {
    Briefcase,
    Camera,
    Code2,
    Compass,
    Home,
    Mail,
    MessageSquareQuote,
    Quote,
    Sparkles,
    User,
} from "lucide-react";

export interface NavItem {
    path: string;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    testId: string;
}

export const PROFESSIONAL_NAV_ITEMS: NavItem[] = [
    {
        path: "/",
        label: "Executive Highlights",
        shortLabel: "Highlights",
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
        path: "/contact",
        label: "Contact & Inquiries",
        shortLabel: "Contact",
        icon: <Mail className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-contact",
    },
];

export const PERSONAL_NAV_ITEMS: NavItem[] = [
    {
        path: "/personal?tab=lifestyle",
        label: "Who Am I?",
        shortLabel: "About Me",
        icon: <User className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-personal-lifestyle",
    },
    {
        path: "/personal?tab=travel",
        label: "Where I've Lived",
        shortLabel: "Travelling",
        icon: <Compass className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-personal-travel",
    },
    {
        path: "/personal?tab=philosophy",
        label: "Philosophy",
        shortLabel: "Philosophy",
        icon: <Quote className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-personal-philosophy",
    },
    {
        path: "/personal?tab=funfacts",
        label: "10 Fun Facts",
        shortLabel: "Fun Facts",
        icon: <Sparkles className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-personal-funfacts",
    },
    {
        path: "/personal?tab=gallery",
        label: "Photo Gallery",
        shortLabel: "Gallery",
        icon: <Camera className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-personal-gallery",
    },
];

export const PRIMARY_NAV_ITEMS: NavItem[] = [
    ...PROFESSIONAL_NAV_ITEMS,
    {
        path: "/personal",
        label: "Personal World",
        shortLabel: "Personal",
        icon: <Compass className="w-4 h-4" aria-hidden="true"/>,
        testId: "nav-link-personal",
    },
];
