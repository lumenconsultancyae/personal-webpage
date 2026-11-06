import React from "react";
import {describe, expect, it} from "vitest";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import PortfolioApp, {createPortfolioQueryClient} from "@/components/PortfolioApp";
import {clearAllProjects} from "@/infrastructure/portfolioApi";

describe("Declarative React Router Workflows, URL Search-Param Sync & Inline Validation", () => {
    it("renders Overview route, toggles theme, and manages mobile drawer", async () => {
        render(
            <PortfolioApp
                initialEntries={["/"]}
                queryClient={createPortfolioQueryClient()}
            />
        );

        await waitFor(() =>
            expect(screen.getByTestId("overview-route")).toBeInTheDocument()
        );
        expect(screen.getByTestId("kpi-card-0")).toHaveTextContent("12+");

        // Theme toggle
        fireEvent.click(screen.getByTestId("theme-toggle"));
        expect(document.documentElement.getAttribute("data-theme")).toBe("light");

        // Mobile navigation drawer open, Escape close, and route auto-close
        fireEvent.click(screen.getByTestId("mobile-menu-toggle"));
        expect(
            screen.getByTestId("mobile-navigation-drawer")
        ).toBeInTheDocument();
        fireEvent.keyDown(window, {key: "Escape"});
        expect(screen.queryByTestId("mobile-navigation-drawer")).toBeNull();

        fireEvent.click(screen.getByTestId("mobile-menu-toggle"));
        fireEvent.click(screen.getByTestId("drawer-nav-link-journey"));
        await waitFor(() =>
            expect(screen.getByTestId("journey-route")).toBeInTheDocument()
        );
        expect(screen.queryByTestId("mobile-navigation-drawer")).toBeNull();
    });

    it("supports Projects route URL filtering, pagination, inline form validation, edit, and delete with Undo", async () => {
        render(
            <PortfolioApp
                initialEntries={["/projects?pageSize=10&page=1"]}
                queryClient={createPortfolioQueryClient()}
            />
        );

        await waitFor(() =>
            expect(screen.getByTestId("projects-route")).toBeInTheDocument()
        );

        expect(screen.getByTestId("pagination-status")).toHaveTextContent(
            /Showing 1–10 of 12 projects/
        );

        // Open progressive disclosure form & trigger empty submit validation errors
        fireEvent.click(screen.getByTestId("toggle-project-form"));
        expect(screen.getByTestId("project-form-panel")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("project-submit-button"));
        await waitFor(() =>
            expect(screen.getByTestId("project-error-name")).toBeInTheDocument()
        );
        expect(screen.getByTestId("project-error-url")).toBeInTheDocument();

        // Fill valid project and submit
        fireEvent.change(screen.getByTestId("project-input-name"), {
            target: {value: "Quantum Telemetry Mesh"},
        });
        fireEvent.change(screen.getByTestId("project-input-url"), {
            target: {value: "https://github.com/wilsonr990/quantum-mesh"},
        });
        fireEvent.change(screen.getByTestId("project-input-tags"), {
            target: {value: "Rust, Kafka, OpenTelemetry"},
        });
        fireEvent.change(screen.getByTestId("project-input-description"), {
            target: {
                value: "Zero-allocation distributed telemetry collector and aggregator.",
            },
        });
        fireEvent.click(screen.getByTestId("project-submit-button"));

        await waitFor(() =>
            expect(screen.getByText("Quantum Telemetry Mesh")).toBeInTheDocument()
        );

        // Delete a project via ConfirmDialog and restore via Toast Undo
        fireEvent.click(
            screen.getByTestId("delete-project-proj-ddd-compiler")
        );
        expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("confirm-dialog-confirm"));

        await waitFor(() =>
            expect(screen.getByTestId("toast-undo-button")).toBeInTheDocument()
        );
        fireEvent.click(screen.getByTestId("toast-undo-button"));
        await waitFor(() =>
            expect(screen.getByText("DDDCompiler")).toBeInTheDocument()
        );
    });

    it("renders no-records empty state when all projects are cleared", async () => {
        await clearAllProjects();
        render(
            <PortfolioApp
                initialEntries={["/projects"]}
                queryClient={createPortfolioQueryClient()}
            />
        );

        await waitFor(() =>
            expect(
                screen.getByTestId("empty-state-no-records")
            ).toBeInTheDocument()
        );
    });

    it("renders Journey, Testimonials, Personal (with gallery lightbox), and Contact inquiry validation & submission", async () => {
        const {unmount} = render(
            <PortfolioApp
                initialEntries={["/testimonials"]}
                queryClient={createPortfolioQueryClient()}
            />
        );

        await waitFor(() =>
            expect(screen.getByTestId("testimonials-route")).toBeInTheDocument()
        );
        fireEvent.click(screen.getByTestId("skill-cat-Backend"));
        expect(screen.getByText("Kotlin")).toBeInTheDocument();

        // Navigate to Personal route, test split-pane blog reader & tab switching, and open gallery lightbox
        fireEvent.click(screen.getByTestId("nav-link-personal"));
        await waitFor(() =>
            expect(screen.getByTestId("personal-route")).toBeInTheDocument()
        );
        fireEvent.click(screen.getByTestId("personal-next-story"));
        fireEvent.click(screen.getByTestId("personal-prev-story"));
        fireEvent.click(screen.getByTestId("blog-select-personal-movies"));
        fireEvent.click(screen.getByTestId("blog-toggle-personal-movies"));
        fireEvent.click(screen.getByTestId("personal-tab-travel"));
        fireEvent.click(screen.getByTestId("personal-tab-philosophy"));
        fireEvent.click(screen.getByTestId("personal-tab-funfacts"));
        fireEvent.click(screen.getByTestId("personal-tab-gallery"));
        fireEvent.click(screen.getByTestId("gallery-card-gal-1"));
        expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("gallery-lightbox-close"));
        expect(screen.queryByTestId("gallery-lightbox")).toBeNull();

        // Navigate to Contact route and test inline validation + valid submission
        fireEvent.click(screen.getByTestId("nav-link-contact"));
        await waitFor(() =>
            expect(screen.getByTestId("contact-route")).toBeInTheDocument()
        );

        fireEvent.click(screen.getByTestId("contact-submit-button"));
        await waitFor(() =>
            expect(screen.getByTestId("contact-error-name")).toBeInTheDocument()
        );

        fireEvent.change(screen.getByTestId("contact-input-name"), {
            target: {value: "Dr. Mateo Silva"},
        });
        fireEvent.change(screen.getByTestId("contact-input-email"), {
            target: {value: "mateo.silva@example.org"},
        });
        fireEvent.change(screen.getByTestId("contact-input-subject"), {
            target: {value: "Distributed AI Inference"},
        });
        fireEvent.change(screen.getByTestId("contact-input-message"), {
            target: {
                value: "We would like to invite you for an architecture advisory workshop.",
            },
        });
        fireEvent.click(screen.getByTestId("contact-submit-button"));

        await waitFor(() =>
            expect(screen.getByText("Dr. Mateo Silva")).toBeInTheDocument()
        );
        unmount();
    });
});
