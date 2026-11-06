"use client";

import clsx from "clsx";
import {motion} from "framer-motion";

type SectionStyle = {
    titleColor: string;
    badgeBorder: string;
};

const personalStyle: SectionStyle = {
    titleColor: "text-pink-300",
    badgeBorder: "from-pink-400/50 via-pink-300/20 to-transparent",
};

const professionalStyle: SectionStyle = {
    titleColor: "text-amber-300",
    badgeBorder: "from-amber-400/50 via-amber-300/20 to-transparent",
};

const sections = {
    personal: personalStyle,
    professional: professionalStyle,
};

type SectionKey = keyof typeof sections;

type SectionProps = {
    id: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    type: SectionKey;
};

function Section({id, title, subtitle, children, className, type}: SectionProps) {
    const style = sections[type];
    return (
        <section
            id={id}
            role="region"
            aria-labelledby={`${id}-title`}
            className={clsx(
                className,
                "min-h-screen snap-start flex flex-col justify-center w-full py-12 md:py-16 pl-5 pr-14 sm:px-10 md:pr-20 text-white text-center relative"
            )}
        >
            <div className="w-full max-w-5xl mx-auto">
                <SectionTitle
                    id={`${id}-title`}
                    title={title}
                    subtitle={subtitle}
                    className={style?.titleColor || "text-white"}
                />
                <motion.div
                    initial={{opacity: 0, y: 28}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 60, damping: 14}}
                    className="w-full mx-auto space-y-6"
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}

type MainTitleProps = {
    id: string;
    title: string;
    subtitle?: string;
    className?: string;
};

function SectionTitle({id, title, subtitle, className}: MainTitleProps) {
    return (
        <div className="mb-6 md:mb-7 text-center">
            <h2
                id={id}
                className={clsx(
                    className,
                    "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
                )}
            >
                {title}
            </h2>
            {subtitle && (
                <p className="mt-1.5 text-white/80 text-lg sm:text-xl md:text-2xl font-light tracking-wide">
                    {subtitle}
                </p>
            )}
            <div className="mt-3 mx-auto h-0.5 w-16 rounded-full bg-white/25"/>
        </div>
    );
}

type SectionSubtitleProps = {
    text: string;
    className?: string;
};

function SectionSubtitle({text, className}: SectionSubtitleProps) {
    return (
        <motion.div
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{type: "spring", stiffness: 60, damping: 14}}
            className="text-center pt-4 pb-2"
        >
            <h3 className={clsx(className, "text-xl sm:text-2xl font-semibold tracking-tight text-white")}>
                {text}
            </h3>
        </motion.div>
    );
}

export {Section, SectionTitle, SectionSubtitle};
