import React from "react";
import {describe, expect, it} from "vitest";
import {renderHook, waitFor, act} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {portfolioKeys} from "@/application/queryKeys";
import {
    clearAllProjects,
    createInquiry,
    createProject,
    createTestimonial,
    deleteInquiry,
    deleteProject,
    deleteTestimonial,
    fetchInquiries,
    fetchProfileOverview,
    fetchProjects,
    fetchTestimonials,
    getSimulatedApiFailure,
    restoreInquiry,
    restoreProject,
    restoreTestimonial,
    setSimulatedApiFailure,
    updateProject,
} from "@/infrastructure/portfolioApi";
import {
    useCreateInquiryMutation,
    useCreateProjectMutation,
    useCreateTestimonialMutation,
    useDeleteInquiryMutation,
    useDeleteProjectMutation,
    useDeleteTestimonialMutation,
    useInquiriesQuery,
    useProfileOverviewQuery,
    useProjectsQuery,
    useRestoreInquiryMutation,
    useRestoreProjectMutation,
    useRestoreTestimonialMutation,
    useTestimonialsQuery,
    useUpdateProjectMutation,
} from "@/application/usePortfolioQueries";

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {retry: false},
            mutations: {retry: false},
        },
    });
    const Wrapper = ({children}: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
    return {queryClient, Wrapper};
}

describe("Portfolio Repository & TanStack Query Hooks", () => {
    it("generates deterministic query keys", () => {
        expect(portfolioKeys.all).toEqual(["portfolio"]);
        expect(portfolioKeys.overview()).toEqual(["portfolio", "overview"]);
        expect(portfolioKeys.projects()).toEqual(["portfolio", "projects"]);
        expect(portfolioKeys.projectList({q: "ddd", category: "Architecture"})).toEqual([
            "portfolio",
            "projects",
            {q: "ddd", category: "Architecture"},
        ]);
        expect(portfolioKeys.projectList()).toEqual([
            "portfolio",
            "projects",
            {},
        ]);
        expect(portfolioKeys.testimonials()).toEqual([
            "portfolio",
            "testimonials",
        ]);
        expect(portfolioKeys.inquiries()).toEqual(["portfolio", "inquiries"]);
    });

    it("performs project, testimonial, and inquiry CRUD and restoration in portfolioApi", async () => {
        const overview = await fetchProfileOverview();
        expect(overview.fullName).toBe("Wilson Guevara");

        const initialProjects = await fetchProjects();
        expect(initialProjects.length).toBeGreaterThanOrEqual(11);

        const created = await createProject({
            name: "Vector Search Service",
            category: "AI & Data",
            description: "Distributed Milvus similarity search microservice.",
            web_url: "https://github.com/wilsonr990/vector-search",
            homepage: "https://example.com",
            tagsInput: "Milvus, Python",
            year: 2026,
        });
        expect(created.homepage).toBe("https://example.com");

        const updated = await updateProject(created.id, {
            name: "Vector Search Service v2",
            category: "AI & Data",
            description: "Updated Milvus similarity search microservice.",
            web_url: "https://github.com/wilsonr990/vector-search",
            homepage: "",
            tagsInput: "Milvus, PyTorch",
            year: 2026,
        });
        expect(updated.name).toBe("Vector Search Service v2");
        expect(updated.homepage).toBeNull();

        await expect(
            updateProject("non-existent-id", {
                name: "Missing",
                category: "Platform",
                description: "Missing project description text",
                web_url: "https://github.com/wilsonr990",
                homepage: "",
                tagsInput: "React",
                year: 2026,
            })
        ).rejects.toThrow(/not found/);

        await deleteProject(created.id);
        const afterDelete = await fetchProjects();
        expect(afterDelete.some((p) => p.id === created.id)).toBe(false);

        await restoreProject(updated);
        const afterRestore = await fetchProjects();
        expect(afterRestore.some((p) => p.id === created.id)).toBe(true);
        // Calling restore again when already present is idempotent
        await restoreProject(updated);

        await clearAllProjects();
        expect(await fetchProjects()).toHaveLength(0);

        // Testimonials CRUD
        const createdTest = await createTestimonial({
            author: "Devon Brooks",
            role: "Staff Engineer",
            company: "FinEdge",
            linkedin: "https://www.linkedin.com/in/devon-brooks/",
            text: "Exceptional distributed systems architect and mentor.",
        });
        await deleteTestimonial(createdTest.id);
        await restoreTestimonial(createdTest);
        await restoreTestimonial(createdTest);
        expect(
            (await fetchTestimonials()).some((t) => t.id === createdTest.id)
        ).toBe(true);

        // Inquiries CRUD
        const createdInq = await createInquiry({
            name: "Samira Khan",
            email: "samira@example.com",
            subject: "Architecture Review",
            category: "Architecture Review",
            message: "Looking for a comprehensive review of our Kafka pipeline.",
        });
        await deleteInquiry(createdInq.id);
        await restoreInquiry(createdInq);
        await restoreInquiry(createdInq);
        expect(
            (await fetchInquiries()).some((i) => i.id === createdInq.id)
        ).toBe(true);

        // Simulated failure toggle
        setSimulatedApiFailure(true);
        expect(getSimulatedApiFailure()).toBe(true);
        await expect(fetchProjects()).rejects.toThrow(/Simulated service/);
        setSimulatedApiFailure(false);
    });

    it("executes TanStack Query hooks with optimistic updates and rollback on error", async () => {
        const {Wrapper} = createWrapper();

        const overviewHook = renderHook(() => useProfileOverviewQuery(), {
            wrapper: Wrapper,
        });
        const projectsHook = renderHook(() => useProjectsQuery(), {
            wrapper: Wrapper,
        });
        const testimonialsHook = renderHook(() => useTestimonialsQuery(), {
            wrapper: Wrapper,
        });
        const inquiriesHook = renderHook(() => useInquiriesQuery(), {
            wrapper: Wrapper,
        });

        await waitFor(() => expect(projectsHook.result.current.isSuccess).toBe(true));
        await waitFor(() => expect(overviewHook.result.current.isSuccess).toBe(true));
        await waitFor(() => expect(testimonialsHook.result.current.isSuccess).toBe(true));
        await waitFor(() => expect(inquiriesHook.result.current.isSuccess).toBe(true));

        const createProj = renderHook(() => useCreateProjectMutation(), {
            wrapper: Wrapper,
        });
        const updateProj = renderHook(() => useUpdateProjectMutation(), {
            wrapper: Wrapper,
        });
        const deleteProj = renderHook(() => useDeleteProjectMutation(), {
            wrapper: Wrapper,
        });
        const restoreProj = renderHook(() => useRestoreProjectMutation(), {
            wrapper: Wrapper,
        });

        let newProjId = "";
        await act(async () => {
            const p = await createProj.result.current.mutateAsync({
                name: "Optimistic Project",
                category: "Platform",
                description: "Created via TanStack Query mutation.",
                web_url: "https://github.com/wilsonr990",
                homepage: "",
                tagsInput: "React, TypeScript",
                year: 2026,
            });
            newProjId = p.id;
        });

        await act(async () => {
            const updated = await updateProj.result.current.mutateAsync({
                id: newProjId,
                input: {
                    name: "Optimistic Project Updated",
                    category: "Platform",
                    description: "Updated via TanStack Query mutation.",
                    web_url: "https://github.com/wilsonr990",
                    homepage: "",
                    tagsInput: "React, Next.js",
                    year: 2026,
                },
            });
            await deleteProj.result.current.mutateAsync(newProjId);
            await restoreProj.result.current.mutateAsync(updated);
        });

        // Test rollback when simulated failure is active
        setSimulatedApiFailure(true);
        await expect(
            act(async () => {
                await createProj.result.current.mutateAsync({
                    name: "Will Rollback",
                    category: "Platform",
                    description: "Should roll back on error",
                    web_url: "https://github.com/wilsonr990",
                    homepage: "",
                    tagsInput: "React",
                    year: 2026,
                });
            })
        ).rejects.toThrow();

        await expect(
            act(async () => {
                await updateProj.result.current.mutateAsync({
                    id: newProjId,
                    input: {
                        name: "Will Fail Update",
                        category: "Platform",
                        description: "Should roll back on error",
                        web_url: "https://github.com/wilsonr990",
                        homepage: "",
                        tagsInput: "React",
                        year: 2026,
                    },
                });
            })
        ).rejects.toThrow();

        await expect(
            act(async () => {
                await deleteProj.result.current.mutateAsync(newProjId);
            })
        ).rejects.toThrow();
        setSimulatedApiFailure(false);

        // Testimonials & Inquiries mutations
        const createTest = renderHook(() => useCreateTestimonialMutation(), {
            wrapper: Wrapper,
        });
        const deleteTest = renderHook(() => useDeleteTestimonialMutation(), {
            wrapper: Wrapper,
        });
        const restoreTest = renderHook(() => useRestoreTestimonialMutation(), {
            wrapper: Wrapper,
        });
        const createInq = renderHook(() => useCreateInquiryMutation(), {
            wrapper: Wrapper,
        });
        const deleteInq = renderHook(() => useDeleteInquiryMutation(), {
            wrapper: Wrapper,
        });
        const restoreInq = renderHook(() => useRestoreInquiryMutation(), {
            wrapper: Wrapper,
        });

        await act(async () => {
            const t = await createTest.result.current.mutateAsync({
                author: "Liam O'Connor",
                role: "Director of Engineering",
                company: "DublinTech",
                linkedin: "https://www.linkedin.com/in/liam/",
                text: "Outstanding architectural leadership and mentorship.",
            });
            await deleteTest.result.current.mutateAsync(t.id);
            await restoreTest.result.current.mutateAsync(t);

            const i = await createInq.result.current.mutateAsync({
                name: "Nadia Al-Mansoor",
                email: "nadia@example.com",
                subject: "AI Pipeline Consulting",
                category: "Consulting",
                message: "Interested in discussing GPU inference optimization.",
            });
            await deleteInq.result.current.mutateAsync(i.id);
            await restoreInq.result.current.mutateAsync(i);
        });

        // Error rollback paths for testimonials & inquiries
        setSimulatedApiFailure(true);
        await expect(
            act(async () => {
                await createTest.result.current.mutateAsync({
                    author: "Fail Author",
                    role: "Role",
                    company: "Company",
                    linkedin: "https://www.linkedin.com/in/fail/",
                    text: "Should rollback on simulated failure.",
                });
            })
        ).rejects.toThrow();
        await expect(
            act(async () => {
                await deleteTest.result.current.mutateAsync("test-benjamin");
            })
        ).rejects.toThrow();
        await expect(
            act(async () => {
                await createInq.result.current.mutateAsync({
                    name: "Fail User",
                    email: "fail@example.com",
                    subject: "Fail Subject",
                    category: "General",
                    message: "Should rollback on simulated failure.",
                });
            })
        ).rejects.toThrow();
        await expect(
            act(async () => {
                await deleteInq.result.current.mutateAsync("inq-seed-1");
            })
        ).rejects.toThrow();
        setSimulatedApiFailure(false);
    });
});
