export type ProjectCategory =
    | "Platform"
    | "AI & Data"
    | "Architecture"
    | "Algorithms"
    | "Automation";

export interface ProjectItem {
    id: string;
    name: string;
    description: string;
    category: ProjectCategory;
    web_url: string;
    homepage: string | null;
    tags: string[];
    year: number;
    featured: boolean;
}

export interface WorkExperience {
    id: string;
    type: "work";
    title: string;
    organization: string;
    location: string;
    duration: string;
    startYear: number;
    details: string;
    highlights: string[];
}

export interface EducationRecord {
    id: string;
    type: "education";
    title: string;
    organization: string;
    location: string;
    duration: string;
    startYear: number;
    details: string;
    field: string;
}

export type JourneyEntry = WorkExperience | EducationRecord;

export interface TestimonialItem {
    id: string;
    author: string;
    role: string;
    company: string;
    linkedin: string;
    text: string;
    year: number;
}

export interface SkillEntry {
    name: string;
    category: "Backend" | "Frontend" | "DevOps & Observability" | "AI, Data & Messaging";
    years: number;
    proficiency: number;
}

export interface TravelStop {
    id: string;
    country: string;
    city: string;
    period: string;
    note: string;
}

export interface PhilosophyItem {
    id: string;
    quote: string;
    context: string;
}

export interface FunFactItem {
    id: string;
    order: number;
    fact: string;
}

export interface GalleryItem {
    id: string;
    src: string;
    alt: string;
    caption: string;
    category: "Community" | "Family" | "Travel" | "Workspace";
}

export interface LifestyleItem {
    id: string;
    iconName: "puzzle" | "languages" | "plane" | "music" | "book" | "film";
    title: string;
    desc: string;
}

export interface ContactInquiry {
    id: string;
    name: string;
    email: string;
    subject: string;
    category: "Consulting" | "Architecture Review" | "Speaking" | "General";
    message: string;
    createdAt: string;
    status: "Received" | "Reviewed";
}

export interface ProfileOverview {
    fullName: string;
    handle: string;
    headline: string;
    pitch: string;
    summaryParagraphs: string[];
    coreCompetencies: string[];
    kpis: {
        label: string;
        value: string;
        detail: string;
    }[];
    roles: string[];
    journey: JourneyEntry[];
    skills: SkillEntry[];
    lifestyle: LifestyleItem[];
    travel: TravelStop[];
    philosophies: PhilosophyItem[];
    funFacts: FunFactItem[];
    gallery: GalleryItem[];
}
