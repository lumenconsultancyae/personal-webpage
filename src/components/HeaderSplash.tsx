"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import Typewriter from 'typewriter-effect';
import {useMediaQuery, useTheme} from "@mui/material";

const variants = {
    container: {
        hidden: {opacity: 0, y: 30},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 60,
                damping: 12,
                staggerChildren: 0.2,
            },
        },
    },
    fadeInLeft: {
        hidden: {opacity: 0, x: -40},
        visible: {opacity: 1, x: 0},
    },
    fadeInScale: {
        hidden: {opacity: 0, scale: 0.9},
        visible: {opacity: 1, scale: 1},
    },
    fadeInUp: {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
    },
};

type IntroHeaderProps = {
    onNavigateAction: (path: string) => void;
};

export default function HeaderSplash({onNavigateAction}: IntroHeaderProps) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div
            role="banner"
            className="h-full w-full bg-gradient-to-b from-cyan-800 to-blue-900 flex flex-col justify-center items-center">
            <section className="w-full flex justify-center text-white">
                <div className="w-full max-w-[650px] flex flex-col md:flex-row md:flex-wrap">
                    <HeroText className="w-full md:max-w-[400px]"/>
                    <ProfileImage className="w-full md:w-[250px]"/>
                    <ButtonGroup className="w-full md:w-[400px]" onNavigate={onNavigateAction}/>
                    {!isSmall && <HeroPitch/>}
                </div>
            </section>
        </div>
    );
}

function AnimatedText() {
    return (
        <span className="inline-block">
            <Typewriter
                options={{
                    loop: true,
                    delay: 50,
                    deleteSpeed: 50,
                }}
                onInit={(typewriter) => {
                    typewriter
                        .typeString("I <b class='text-orange-300'>design</b>")
                        .pauseFor(1000)
                        .deleteChars(6)
                        .typeString("<b class='text-orange-300'>develop</b>")
                        .pauseFor(1000)
                        .deleteChars(7)
                        .typeString("<b class='text-orange-300'>test</b>")
                        .pauseFor(1000)
                        .deleteChars(4)
                        .typeString("<b class='text-orange-300'>deploy</b>")
                        .pauseFor(1000)
                        .deleteChars(6)
                        .changeDelay(100)
                        .typeString("<b class='text-orange-300'>deliver software solutions</b>")
                        .pauseFor(30000)
                        .changeDeleteSpeed(300)
                        .deleteAll()
                        .changeDelay(50)
                        .start();
                }}
            />
        </span>
    );
}


function HeroText({className}: { className?: string }) {
    return (
        <motion.div variants={variants.fadeInLeft} className={clsx(className, "md:mt-28 text-center md:text-left")}>
            <h1 className="text-4xl md:text-5xl font-light inline-block leading-tight">
                Hi, I am <span className="font-semibold text-orange-300">Wilson</span>
                <br/>
                <div aria-live="polite" aria-label="Dynamic roles like developer, designer...">
                    <AnimatedText/>
                </div>
            </h1>
        </motion.div>
    );
}

function ProfileImage({className}: { className?: string }) {
    return (
        <motion.div variants={variants.fadeInScale} className={clsx(className, "relative")}>
            <div
                className="absolute w-[200px] md:w-auto md:max-w-[300px] m-auto inset-0 scale-110 bg-cyan-600 opacity-30 blur-2xl rounded-full"/>
            <Image
                src="/profile-hi.png"
                alt="Wilson Guevara avatar"
                width={300}
                height={463}
                className="w-[200px] md:w-auto md:max-w-[300px] m-auto object-contain filter saturate-100 contrast-130 md:float-end"
            />
        </motion.div>
    );
}

type ButtonGroupProps = {
    className?: string;
    onNavigate: (path: string) => void;
};

function ButtonGroup({className, onNavigate}: ButtonGroupProps) {
    const buttons = [
        {label: "Professional", id: "portfolio"},
        {label: "Personal", id: "personal"},
    ];

    return (
        <motion.div variants={variants.fadeInUp}
                    className={clsx(className, "h-0 md:h-auto my-4 flex gap-4 justify-center flex-wrap")}>
            {buttons.map(({label, id}) => (
                <motion.button
                    key={label}
                    aria-label={`Navigate to ${label} section`}
                    onClick={() => onNavigate(id)}
                    className="w-1/3 md:w-2/5 px-5 py-2 md:relative md:bottom-32 rounded-md text-lg font-medium transition bg-white text-blue-900 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="button"
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                >
                    {label}
                </motion.button>
            ))}
        </motion.div>
    );
}

const HeroPitch = () => (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-xl font-semibold animate-bounce">
        I build elegant software that solves real problems — fast.
    </div>
);
