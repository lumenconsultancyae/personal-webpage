"use client";

import {Download, Github, Linkedin, Mail, Phone} from "lucide-react";
import {SiGitlab} from "react-icons/si";

export default function ContactSection() {
    return (
        <>
            <p className="text-white/80 text-lg">
                Whether you want to work together, have a question, or just want to
                say hi — my inbox is always open.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
                <a
                    href="mailto:wilsonr100@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-300 text-blue-900 font-semibold rounded-md hover:bg-orange-400 transition"
                >
                    <Mail className="w-5 h-5"/>
                    wilsonr100@gmail.com
                </a>
                <a
                    href="tel:+971565712642"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 text-white font-medium rounded-md hover:bg-white/20 transition"
                >
                    <Phone className="w-5 h-5 text-orange-300"/>
                    +971 565712642
                </a>
            </div>

            <div className="flex justify-center items-center gap-6 mt-6 text-white/80">
                <a
                    href="https://www.linkedin.com/in/wilsonr990/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn (@wilsonr990)"
                    className="hover:text-orange-300 transition"
                >
                    <Linkedin className="w-6 h-6"/>
                </a>
                <a
                    href="https://gitlab.com/wilsonr990"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitLab Profile"
                    title="GitLab (@wilsonr990)"
                    className="hover:text-orange-300 transition"
                >
                    <SiGitlab className="w-6 h-6"/>
                </a>
                <a
                    href="https://github.com/wilsonr990"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    title="GitHub (@wilsonr990)"
                    className="hover:text-orange-300 transition"
                >
                    <Github className="w-6 h-6"/>
                </a>
                <a
                    href="/FinalResume.pdf"
                    download
                    aria-label="Download CV PDF"
                    title="Download CV (PDF)"
                    className="inline-flex items-center gap-1 hover:text-orange-300 transition"
                >
                    <Download className="w-4 h-4"/>
                    <span className="underline text-sm">Download CV</span>
                </a>
            </div>
        </>
    );
}
