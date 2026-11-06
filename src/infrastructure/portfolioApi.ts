import type {
    ContactInquiry,
    ProfileOverview,
    ProjectItem,
    TestimonialItem,
} from "@/domain/models";
import type {
    ContactInquiryParsed,
    ProjectFormParsed,
    TestimonialFormParsed,
} from "@/domain/schemas";
import {sanitizeText} from "@/domain/schemas";
import {
    INITIAL_INQUIRIES,
    INITIAL_PROJECTS,
    INITIAL_TESTIMONIALS,
    PROFILE_OVERVIEW,
} from "./seedData";

const STORAGE_KEYS = {
    projects: "wilson_portfolio_projects_v1",
    testimonials: "wilson_portfolio_testimonials_v1",
    inquiries: "wilson_portfolio_inquiries_v1",
} as const;

let memoryProjects: ProjectItem[] = [...INITIAL_PROJECTS];
let memoryTestimonials: TestimonialItem[] = [...INITIAL_TESTIMONIALS];
let memoryInquiries: ContactInquiry[] = [...INITIAL_INQUIRIES];
let simulatedFailureMode = false;

export function setSimulatedApiFailure(shouldFail: boolean): void {
    simulatedFailureMode = shouldFail;
}

export function getSimulatedApiFailure(): boolean {
    return simulatedFailureMode;
}

export function resetPortfolioStore(): void {
    memoryProjects = [...INITIAL_PROJECTS];
    memoryTestimonials = [...INITIAL_TESTIMONIALS];
    memoryInquiries = [...INITIAL_INQUIRIES];
    simulatedFailureMode = false;
    if (typeof window !== "undefined" && window.localStorage) {
        try {
            window.localStorage.removeItem(STORAGE_KEYS.projects);
            window.localStorage.removeItem(STORAGE_KEYS.testimonials);
            window.localStorage.removeItem(STORAGE_KEYS.inquiries);
        } catch {
            // Ignore storage errors in restricted environments
        }
    }
}

function readCollection<T>(key: string, fallback: T[]): T[] {
    if (typeof window === "undefined" || !window.localStorage) {
        return fallback;
    }
    try {
        const raw = window.localStorage.getItem(key);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw) as unknown;
        return Array.isArray(parsed) ? (parsed as T[]) : fallback;
    } catch {
        return fallback;
    }
}

function writeCollection<T>(key: string, items: T[]): void {
    if (typeof window === "undefined" || !window.localStorage) {
        return;
    }
    try {
        window.localStorage.setItem(key, JSON.stringify(items));
    } catch {
        // Ignore quota errors
    }
}

function checkFailure(): void {
    if (simulatedFailureMode) {
        throw new Error("Simulated service unavailability. Please retry.");
    }
}

export async function fetchProfileOverview(): Promise<ProfileOverview> {
    checkFailure();
    return PROFILE_OVERVIEW;
}

export async function fetchProjects(): Promise<ProjectItem[]> {
    checkFailure();
    memoryProjects = readCollection<ProjectItem>(STORAGE_KEYS.projects, memoryProjects);
    return [...memoryProjects];
}

export async function createProject(input: ProjectFormParsed): Promise<ProjectItem> {
    checkFailure();
    const current = await fetchProjects();
    const tags = input.tagsInput
        .split(",")
        .map((t) => sanitizeText(t))
        .filter(Boolean);

    const created: ProjectItem = {
        id: `proj-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: sanitizeText(input.name),
        category: input.category,
        description: sanitizeText(input.description),
        web_url: input.web_url.trim(),
        homepage: input.homepage && input.homepage.trim().length > 0 ? input.homepage.trim() : null,
        tags: tags.length > 0 ? tags : ["Engineering"],
        year: input.year,
        featured: true,
    };

    const next = [created, ...current];
    memoryProjects = next;
    writeCollection(STORAGE_KEYS.projects, next);
    return created;
}

export async function updateProject(
    id: string,
    input: ProjectFormParsed
): Promise<ProjectItem> {
    checkFailure();
    const current = await fetchProjects();
    const existing = current.find((p) => p.id === id);
    if (!existing) {
        throw new Error(`Project with id "${id}" was not found.`);
    }

    const tags = input.tagsInput
        .split(",")
        .map((t) => sanitizeText(t))
        .filter(Boolean);

    const updated: ProjectItem = {
        ...existing,
        name: sanitizeText(input.name),
        category: input.category,
        description: sanitizeText(input.description),
        web_url: input.web_url.trim(),
        homepage: input.homepage && input.homepage.trim().length > 0 ? input.homepage.trim() : null,
        tags: tags.length > 0 ? tags : existing.tags,
        year: input.year,
    };

    const next = current.map((p) => (p.id === id ? updated : p));
    memoryProjects = next;
    writeCollection(STORAGE_KEYS.projects, next);
    return updated;
}

export async function deleteProject(id: string): Promise<{ deletedId: string }> {
    checkFailure();
    const current = await fetchProjects();
    const next = current.filter((p) => p.id !== id);
    memoryProjects = next;
    writeCollection(STORAGE_KEYS.projects, next);
    return {deletedId: id};
}

export async function restoreProject(project: ProjectItem): Promise<ProjectItem> {
    checkFailure();
    const current = await fetchProjects();
    const exists = current.some((p) => p.id === project.id);
    const next = exists ? current : [project, ...current];
    memoryProjects = next;
    writeCollection(STORAGE_KEYS.projects, next);
    return project;
}

export async function clearAllProjects(): Promise<void> {
    memoryProjects = [];
    writeCollection(STORAGE_KEYS.projects, []);
}

export async function fetchTestimonials(): Promise<TestimonialItem[]> {
    checkFailure();
    memoryTestimonials = readCollection<TestimonialItem>(
        STORAGE_KEYS.testimonials,
        memoryTestimonials
    );
    return [...memoryTestimonials];
}

export async function createTestimonial(
    input: TestimonialFormParsed
): Promise<TestimonialItem> {
    checkFailure();
    const current = await fetchTestimonials();
    const created: TestimonialItem = {
        id: `test-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        author: sanitizeText(input.author),
        role: sanitizeText(input.role),
        company: sanitizeText(input.company),
        linkedin: input.linkedin.trim(),
        text: sanitizeText(input.text),
        year: new Date().getFullYear(),
    };
    const next = [created, ...current];
    memoryTestimonials = next;
    writeCollection(STORAGE_KEYS.testimonials, next);
    return created;
}

export async function deleteTestimonial(id: string): Promise<{ deletedId: string }> {
    checkFailure();
    const current = await fetchTestimonials();
    const next = current.filter((t) => t.id !== id);
    memoryTestimonials = next;
    writeCollection(STORAGE_KEYS.testimonials, next);
    return {deletedId: id};
}

export async function restoreTestimonial(
    item: TestimonialItem
): Promise<TestimonialItem> {
    checkFailure();
    const current = await fetchTestimonials();
    const exists = current.some((t) => t.id === item.id);
    const next = exists ? current : [item, ...current];
    memoryTestimonials = next;
    writeCollection(STORAGE_KEYS.testimonials, next);
    return item;
}

export async function fetchInquiries(): Promise<ContactInquiry[]> {
    checkFailure();
    memoryInquiries = readCollection<ContactInquiry>(
        STORAGE_KEYS.inquiries,
        memoryInquiries
    );
    return [...memoryInquiries];
}

export async function createInquiry(
    input: ContactInquiryParsed
): Promise<ContactInquiry> {
    checkFailure();
    const current = await fetchInquiries();
    const created: ContactInquiry = {
        id: `inq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: sanitizeText(input.name),
        email: input.email.trim(),
        subject: sanitizeText(input.subject),
        category: input.category,
        message: sanitizeText(input.message),
        createdAt: new Date().toISOString().slice(0, 10),
        status: "Received",
    };
    const next = [created, ...current];
    memoryInquiries = next;
    writeCollection(STORAGE_KEYS.inquiries, next);
    return created;
}

export async function deleteInquiry(id: string): Promise<{ deletedId: string }> {
    checkFailure();
    const current = await fetchInquiries();
    const next = current.filter((i) => i.id !== id);
    memoryInquiries = next;
    writeCollection(STORAGE_KEYS.inquiries, next);
    return {deletedId: id};
}

export async function restoreInquiry(
    item: ContactInquiry
): Promise<ContactInquiry> {
    checkFailure();
    const current = await fetchInquiries();
    const exists = current.some((i) => i.id === item.id);
    const next = exists ? current : [item, ...current];
    memoryInquiries = next;
    writeCollection(STORAGE_KEYS.inquiries, next);
    return item;
}
