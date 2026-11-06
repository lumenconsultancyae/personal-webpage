import {z} from "zod";
import type {ProjectCategory} from "./models";

/**
 * Strips raw HTML tags and script vectors so user-supplied strings are always safe text.
 */
export function sanitizeText(raw: string): string {
    return raw
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/<\/?[a-z][^>]*>/gi, "")
        .replace(/javascript:/gi, "")
        .trim();
}

export const PROJECT_CATEGORIES: readonly [ProjectCategory, ...ProjectCategory[]] = [
    "Platform",
    "AI & Data",
    "Architecture",
    "Algorithms",
    "Automation",
];

export const projectFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Project name must be at least 3 characters.")
        .max(80, "Project name must not exceed 80 characters.")
        .transform(sanitizeText)
        .refine((v) => v.length >= 3, "Project name must contain valid text."),
    category: z.enum(PROJECT_CATEGORIES, {
        message: "Select a valid project category.",
    }),
    description: z
        .string()
        .trim()
        .min(12, "Description must be at least 12 characters.")
        .max(400, "Description must not exceed 400 characters.")
        .transform(sanitizeText)
        .refine((v) => v.length >= 12, "Description must contain at least 12 valid characters."),
    web_url: z
        .string()
        .trim()
        .url("Repository URL must be a valid https:// or http:// URL.")
        .refine(
            (v) => v.startsWith("https://") || v.startsWith("http://"),
            "Repository URL must start with https:// or http://."
        ),
    homepage: z
        .string()
        .trim()
        .optional()
        .transform((v) => (v && v.length > 0 ? v : ""))
        .refine(
            (v) => v === "" || /^https?:\/\/.+/i.test(v),
            "Companion URL must be empty or a valid http(s) URL."
        ),
    tagsInput: z
        .string()
        .trim()
        .min(2, "Provide at least one technology tag (comma-separated).")
        .transform(sanitizeText),
    year: z.coerce
        .number({message: "Year must be a valid number."})
        .int("Year must be an integer.")
        .min(2010, "Year must be 2010 or later.")
        .max(2030, "Year must be 2030 or earlier."),
});

export type ProjectFormValues = z.input<typeof projectFormSchema>;
export type ProjectFormParsed = z.output<typeof projectFormSchema>;

export const testimonialFormSchema = z.object({
    author: z
        .string()
        .trim()
        .min(2, "Author name must be at least 2 characters.")
        .max(60, "Author name must not exceed 60 characters.")
        .transform(sanitizeText)
        .refine((v) => v.length >= 2, "Author name must contain valid characters."),
    role: z
        .string()
        .trim()
        .min(2, "Role title must be at least 2 characters.")
        .max(60, "Role title must not exceed 60 characters.")
        .transform(sanitizeText),
    company: z
        .string()
        .trim()
        .min(2, "Company name must be at least 2 characters.")
        .max(60, "Company name must not exceed 60 characters.")
        .transform(sanitizeText),
    linkedin: z
        .string()
        .trim()
        .url("LinkedIn profile must be a valid URL.")
        .refine(
            (v) => v.startsWith("https://") || v.startsWith("http://"),
            "LinkedIn URL must start with https:// or http://."
        ),
    text: z
        .string()
        .trim()
        .min(20, "Recommendation text must be at least 20 characters.")
        .max(600, "Recommendation text must not exceed 600 characters.")
        .transform(sanitizeText)
        .refine((v) => v.length >= 20, "Recommendation text must contain at least 20 valid characters."),
});

export type TestimonialFormValues = z.input<typeof testimonialFormSchema>;
export type TestimonialFormParsed = z.output<typeof testimonialFormSchema>;

export const INQUIRY_CATEGORIES = [
    "Consulting",
    "Architecture Review",
    "Speaking",
    "General",
] as const;

export const contactInquirySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Your name must be at least 2 characters.")
        .max(60, "Your name must not exceed 60 characters.")
        .transform(sanitizeText)
        .refine((v) => v.length >= 2, "Your name must contain valid characters."),
    email: z
        .string()
        .trim()
        .email("Please enter a valid email address."),
    subject: z
        .string()
        .trim()
        .min(4, "Subject must be at least 4 characters.")
        .max(100, "Subject must not exceed 100 characters.")
        .transform(sanitizeText)
        .refine((v) => v.length >= 4, "Subject must contain at least 4 valid characters."),
    category: z.enum(INQUIRY_CATEGORIES, {
        message: "Please select an inquiry category.",
    }),
    message: z
        .string()
        .trim()
        .min(15, "Message must be at least 15 characters.")
        .max(1000, "Message must not exceed 1000 characters.")
        .transform(sanitizeText)
        .refine((v) => v.length >= 15, "Message must contain at least 15 valid characters."),
});

export type ContactInquiryFormValues = z.input<typeof contactInquirySchema>;
export type ContactInquiryParsed = z.output<typeof contactInquirySchema>;
