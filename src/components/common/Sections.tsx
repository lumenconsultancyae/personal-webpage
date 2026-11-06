"use client";

import clsx from "clsx";
import {motion} from "framer-motion";

type SectionStyle = {
    titleColor: string;
    background: string;
};

const personalStyle: SectionStyle = {
    titleColor: "text-pink-300",
    background: "bg-gradient-to-b from-purple-800 to-fuchsia-900"
};
const professionalStyle: SectionStyle = {
    titleColor: "text-orange-300",
    background: "bg-gradient-to-b from-cyan-800 to-blue-900"
};
const sections = {
    personal: personalStyle,
    professional: professionalStyle,
}

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
        <section id={id} role="region" aria-labelledby={`${id}-title`} className="min-h-screen snap-start">
            <div
                className={clsx(className, style?.background || "bg-gray-800", "w-full py-16 px-6 text-white text-center")}>
                <SectionTitle id={id} title={title}
                              subtitle={subtitle} className={style?.titleColor || "text-white"}/>
                <motion.div
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 60, damping: 12}}
                    className="max-w-3xl mx-auto space-y-8"
                >
                    {children}
                </motion.div>
            </div>
        </section>
    )
}


type MainTitleProps = {
    id: string;
    title: string;
    subtitle?: string;
    className?: string;
}

function SectionTitle({id, title, subtitle, className}: MainTitleProps,) {
    return (
        <h2 id={id} className={clsx(className, "text-4xl md:text-5xl font-light text-center mb-12")}>
            <motion.span
                initial={{scale: 1, opacity: 0, x: "-100%"}}
                whileHover={{scale: 1.1}}
                whileInView={{scale: 1, opacity: 1, x: 0}}
                transition={{type: "spring", stiffness: 60, damping: 12, delay: 0.3}}
                className="font-semibold"
            >
                {title}
            </motion.span>
            {subtitle && (
                <>
                    <br/>
                    <motion.span
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{type: "spring", stiffness: 60, damping: 12, delay: 0.5}}
                        className="text-white text-3xl md:text-4xl"
                    >
                        {subtitle}
                    </motion.span>
                </>
            )}
        </h2>
    )
        ;
}

type SectionSubtitleProps = {
    text: string;
    className?: string;
}

function SectionSubtitle({text, className}: SectionSubtitleProps,) {
    return (
        <motion.div
            initial={{opacity: 0, x: -40}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{type: "spring", stiffness: 60, damping: 12}}
            className="text-center mb-12"
        >
            <h2 className={clsx(className, "text-3xl font-bold")}>{text}</h2>
        </motion.div>
    );
}


export {Section, SectionTitle, SectionSubtitle}
