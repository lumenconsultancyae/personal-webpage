"use client";

import {Download, Github, Linkedin, Mail, Phone} from "lucide-react";
import {SiGitlab} from "react-icons/si";

export default function ContactSection() {
    return (
        <div className="space-y-4">
            <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto">
                Whether you want to work together, have a question, or just want to
                say hi — my inbox is always open.
            </p>

            <div className="flex flex-wrap justify-center gap-3.5">
                <a
                    href="mailto:wilsonr100@gmail.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-300 text-slate-950 font-semibold rounded-xl shadow-md hover:bg-amber-200 transition text-sm"
                >
                    <Mail className="w-4 h-4"/>
                    wilsonr100@gmail.com
                </a>
                <a
                    href="tel:+971565712642"
                    className="inline-flex items-center gap-2 px-5 py-2.5 glass-card-interactive text-white font-medium rounded-xl text-sm"
                >
                    <Phone className="w-4 h-4 text-amber-300"/>
                    +971 565712642
                </a>
            </div>

            <div className="flex justify-center items-center gap-5 pt-2 text-white/80">
                <a
                    href="https://www.linkedin.com/in/wilsonr990/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn (@wilsonr990)"
                    className="p-2 rounded-lg hover:bg-white/10 hover:text-amber-300 transition"
                >
                    <Linkedin className="w-5 h-5"/>
                </a>
                <a
                    href="https://gitlab.com/wilsonr990"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitLab Profile"
                    title="GitLab (@wilsonr990)"
                    className="p-2 rounded-lg hover:bg-white/10 hover:text-amber-300 transition"
                >
                    <SiGitlab className="w-5 h-5"/>
                </a>
                <a
                    href="https://github.com/wilsonr990"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    title="GitHub (@wilsonr990)"
                    className="p-2 rounded-lg hover:bg-white/10 hover:text-amber-300 transition"
                >
                    <Github className="w-5 h-5"/>
                </a>
                <a
                    href="/FinalResume.pdf"
                    download
                    aria-label="Download CV PDF"
                    title="Download CV (PDF)"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-amber-300 transition text-xs font-medium"
                >
                    <Download className="w-3.5 h-3.5"/>
                    <span>Resume PDF</span>
                </a>
            </div>
        </div>
    );
}
