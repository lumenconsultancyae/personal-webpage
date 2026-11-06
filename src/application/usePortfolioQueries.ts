import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import type {
    ContactInquiry,
    ProjectItem,
    TestimonialItem,
} from "@/domain/models";
import type {
    ContactInquiryParsed,
    ProjectFormParsed,
    TestimonialFormParsed,
} from "@/domain/schemas";
import {
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
    restoreInquiry,
    restoreProject,
    restoreTestimonial,
    updateProject,
} from "@/infrastructure/portfolioApi";
import {portfolioKeys} from "./queryKeys";

export function useProfileOverviewQuery() {
    return useQuery({
        queryKey: portfolioKeys.overview(),
        queryFn: fetchProfileOverview,
    });
}

export function useProjectsQuery() {
    return useQuery({
        queryKey: portfolioKeys.projects(),
        queryFn: fetchProjects,
    });
}

export function useCreateProjectMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (input: ProjectFormParsed) => createProject(input),
        onMutate: async (input) => {
            await queryClient.cancelQueries({queryKey: portfolioKeys.projects()});
            const previous = queryClient.getQueryData<ProjectItem[]>(
                portfolioKeys.projects()
            );
            const optimistic: ProjectItem = {
                id: `optimistic-${Date.now()}`,
                name: input.name,
                category: input.category,
                description: input.description,
                web_url: input.web_url,
                homepage: input.homepage || null,
                tags: input.tagsInput
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                year: input.year,
                featured: true,
            };
            queryClient.setQueryData<ProjectItem[]>(
                portfolioKeys.projects(),
                (old) => [optimistic, ...(old ?? [])]
            );
            return {previous};
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(portfolioKeys.projects(), context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: portfolioKeys.projects()});
        },
    });
}

export function useUpdateProjectMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, input}: { id: string; input: ProjectFormParsed }) =>
            updateProject(id, input),
        onMutate: async ({id, input}) => {
            await queryClient.cancelQueries({queryKey: portfolioKeys.projects()});
            const previous = queryClient.getQueryData<ProjectItem[]>(
                portfolioKeys.projects()
            );
            queryClient.setQueryData<ProjectItem[]>(
                portfolioKeys.projects(),
                (old) =>
                    (old ?? []).map((p) =>
                        p.id === id
                            ? {
                                  ...p,
                                  name: input.name,
                                  category: input.category,
                                  description: input.description,
                                  web_url: input.web_url,
                                  homepage: input.homepage || null,
                                  tags: input.tagsInput
                                      .split(",")
                                      .map((t) => t.trim())
                                      .filter(Boolean),
                                  year: input.year,
                              }
                            : p
                    )
            );
            return {previous};
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(portfolioKeys.projects(), context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: portfolioKeys.projects()});
        },
    });
}

export function useDeleteProjectMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteProject(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({queryKey: portfolioKeys.projects()});
            const previous = queryClient.getQueryData<ProjectItem[]>(
                portfolioKeys.projects()
            );
            queryClient.setQueryData<ProjectItem[]>(
                portfolioKeys.projects(),
                (old) => (old ?? []).filter((p) => p.id !== id)
            );
            return {previous};
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(portfolioKeys.projects(), context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: portfolioKeys.projects()});
        },
    });
}

export function useRestoreProjectMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (project: ProjectItem) => restoreProject(project),
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: portfolioKeys.projects()});
        },
    });
}

export function useTestimonialsQuery() {
    return useQuery({
        queryKey: portfolioKeys.testimonials(),
        queryFn: fetchTestimonials,
    });
}

export function useCreateTestimonialMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (input: TestimonialFormParsed) => createTestimonial(input),
        onMutate: async (input) => {
            await queryClient.cancelQueries({queryKey: portfolioKeys.testimonials()});
            const previous = queryClient.getQueryData<TestimonialItem[]>(
                portfolioKeys.testimonials()
            );
            const optimistic: TestimonialItem = {
                id: `optimistic-${Date.now()}`,
                author: input.author,
                role: input.role,
                company: input.company,
                linkedin: input.linkedin,
                text: input.text,
                year: new Date().getFullYear(),
            };
            queryClient.setQueryData<TestimonialItem[]>(
                portfolioKeys.testimonials(),
                (old) => [optimistic, ...(old ?? [])]
            );
            return {previous};
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(
                    portfolioKeys.testimonials(),
                    context.previous
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: portfolioKeys.testimonials()});
        },
    });
}

export function useDeleteTestimonialMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteTestimonial(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({queryKey: portfolioKeys.testimonials()});
            const previous = queryClient.getQueryData<TestimonialItem[]>(
                portfolioKeys.testimonials()
            );
            queryClient.setQueryData<TestimonialItem[]>(
                portfolioKeys.testimonials(),
                (old) => (old ?? []).filter((t) => t.id !== id)
            );
            return {previous};
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(
                    portfolioKeys.testimonials(),
                    context.previous
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: portfolioKeys.testimonials()});
        },
    });
}

export function useRestoreTestimonialMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item: TestimonialItem) => restoreTestimonial(item),
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: portfolioKeys.testimonials()});
        },
    });
}

export function useInquiriesQuery() {
    return useQuery({
        queryKey: portfolioKeys.inquiries(),
        queryFn: fetchInquiries,
    });
}

export function useCreateInquiryMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (input: ContactInquiryParsed) => createInquiry(input),
        onMutate: async (input) => {
            await queryClient.cancelQueries({queryKey: portfolioKeys.inquiries()});
            const previous = queryClient.getQueryData<ContactInquiry[]>(
                portfolioKeys.inquiries()
            );
            const optimistic: ContactInquiry = {
                id: `optimistic-${Date.now()}`,
                name: input.name,
                email: input.email,
                subject: input.subject,
                category: input.category,
                message: input.message,
                createdAt: new Date().toISOString().slice(0, 10),
                status: "Received",
            };
            queryClient.setQueryData<ContactInquiry[]>(
                portfolioKeys.inquiries(),
                (old) => [optimistic, ...(old ?? [])]
            );
            return {previous};
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(portfolioKeys.inquiries(), context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: portfolioKeys.inquiries()});
        },
    });
}

export function useDeleteInquiryMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteInquiry(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({queryKey: portfolioKeys.inquiries()});
            const previous = queryClient.getQueryData<ContactInquiry[]>(
                portfolioKeys.inquiries()
            );
            queryClient.setQueryData<ContactInquiry[]>(
                portfolioKeys.inquiries(),
                (old) => (old ?? []).filter((i) => i.id !== id)
            );
            return {previous};
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(portfolioKeys.inquiries(), context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: portfolioKeys.inquiries()});
        },
    });
}

export function useRestoreInquiryMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item: ContactInquiry) => restoreInquiry(item),
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: portfolioKeys.inquiries()});
        },
    });
}
