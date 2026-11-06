export const portfolioKeys = {
    all: ["portfolio"] as const,
    overview: () => [...portfolioKeys.all, "overview"] as const,
    projects: () => [...portfolioKeys.all, "projects"] as const,
    projectList: (filters?: {
        q?: string;
        category?: string;
        sort?: string;
    }) => [...portfolioKeys.projects(), filters ?? {}] as const,
    testimonials: () => [...portfolioKeys.all, "testimonials"] as const,
    inquiries: () => [...portfolioKeys.all, "inquiries"] as const,
};
