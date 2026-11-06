import fs from "fs";
import path from "path";
import {describe, expect, it} from "vitest";
import {
    contactInquirySchema,
    projectFormSchema,
    sanitizeText,
    testimonialFormSchema,
} from "@/domain/schemas";
import {capitalize, toSpacedString} from "@/utils/string-utils";

function collectSourceFiles(dir: string): string[] {
    const entries = fs.readdirSync(dir, {withFileTypes: true});
    const files: string[] = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name !== "__tests__") {
                files.push(...collectSourceFiles(fullPath));
            }
        } else if (/\.(ts|tsx|css)$/.test(entry.name)) {
            files.push(fullPath);
        }
    }
    return files;
}

describe("Domain Validation Schemas, XSS Sanitization & Static Hygiene Gates", () => {
    it("sanitizes script tags, raw HTML elements, and javascript: URIs from user strings", () => {
        const dirty =
            '<script>alert("xss")</script><b>Clean Architecture</b> javascript:evil()';
        const cleaned = sanitizeText(dirty);
        expect(cleaned).not.toContain("<script>");
        expect(cleaned).not.toContain("<b>");
        expect(cleaned).not.toContain("javascript:");
        expect(cleaned).toContain("Clean Architecture");
    });

    it("validates projectFormSchema and rejects invalid fields with clear messages", () => {
        const invalid = projectFormSchema.safeParse({
            name: "ab",
            category: "Platform",
            description: "too short",
            web_url: "ftp://invalid-protocol.com",
            homepage: "not-a-url",
            tagsInput: "a",
            year: 1999,
        });
        expect(invalid.success).toBe(false);

        const valid = projectFormSchema.safeParse({
            name: "<b>Distributed ML Engine</b>",
            category: "AI & Data",
            description:
                "High-throughput Triton inference pipeline with GPU autoscaling.",
            web_url: "https://github.com/lumenconsultancyae/personal-webpage",
            homepage: "",
            tagsInput: "Python, PyTorch, Triton",
            year: "2026",
        });
        expect(valid.success).toBe(true);
        if (valid.success) {
            expect(valid.data.name).toBe("Distributed ML Engine");
            expect(valid.data.year).toBe(2026);
            expect(valid.data.homepage).toBe("");
        }
    });

    it("validates testimonialFormSchema and contactInquirySchema", () => {
        const badTestimonial = testimonialFormSchema.safeParse({
            author: "A",
            role: "B",
            company: "C",
            linkedin: "invalid",
            text: "Too short",
        });
        expect(badTestimonial.success).toBe(false);

        const goodTestimonial = testimonialFormSchema.safeParse({
            author: "Sarah Chen",
            role: "Principal Architect",
            company: "CloudScale",
            linkedin: "https://www.linkedin.com/in/sarah-chen/",
            text: "Wilson delivered our reactive event mesh ahead of schedule with 100% test coverage.",
        });
        expect(goodTestimonial.success).toBe(true);

        const badInquiry = contactInquirySchema.safeParse({
            name: "J",
            email: "not-an-email",
            subject: "Hi",
            category: "Consulting",
            message: "Short",
        });
        expect(badInquiry.success).toBe(false);

        const goodInquiry = contactInquirySchema.safeParse({
            name: "Alex Rivera",
            email: "alex@example.com",
            subject: "MLOps Advisory Inquiry",
            category: "Consulting",
            message: "We would love to discuss your availability for Q4 architecture consulting.",
        });
        expect(goodInquiry.success).toBe(true);
    });

    it("formats strings via string-utils helpers", () => {
        expect(capitalize("wilson")).toBe("Wilson");
        expect(toSpacedString("professionalHighlights")).toBe(
            "professional Highlights"
        );
    });

    it("enforces zero native alert/confirm/prompt, zero dangerouslySetInnerHTML, zero hardcoded hex in TSX, and <500 lines per file", () => {
        const srcRoot = path.resolve(__dirname, "..");
        const files = collectSourceFiles(srcRoot);
        expect(files.length).toBeGreaterThan(10);

        for (const file of files) {
            const content = fs.readFileSync(file, "utf-8");
            const lines = content.split("\n").length;
            expect(
                lines,
                `File ${file} exceeds 500 lines (${lines})`
            ).toBeLessThan(500);

            expect(content).not.toMatch(
                /\bwindow\.(alert|confirm|prompt)\s*\(/
            );
            expect(content).not.toMatch(/\b(alert|confirm|prompt)\s*\(/);
            expect(content).not.toContain("dangerouslySetInnerHTML");
            expect(content).not.toContain(".innerHTML");

            if (file.endsWith(".tsx")) {
                expect(
                    content,
                    `Hardcoded hex color found in ${file}`
                ).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
            }
        }
    });
});
