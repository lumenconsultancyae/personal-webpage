"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import {Briefcase, Sparkles} from "lucide-react";

type IntroHeaderProps = {
    onNavigateAction: (path: string) => void;
};

export default function HeaderSplash({onNavigateAction}: IntroHeaderProps) {
    return (
        <div
            role="banner"
            className="relative h-full w-full bg-professional-canvas flex flex-col justify-between items-center px-6 py-8 md:py-12 overflow-hidden"
        >
            <div aria-hidden="true" className="h-4"/>

            <section className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-white z-10">
                <motion.div
                    initial={{opacity: 0, x: -30}}
                    animate={{opacity: 1, x: 0}}
                    transition={{type: "spring", stiffness: 60, damping: 14}}
                    className="flex-1 text-center md:text-left space-y-6"
                >
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-widest bg-white/10 border border-white/15 text-amber-300">
                        Staff Software &amp; Data Engineer
                    </span>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight tracking-tight">
                        Hi, I am{" "}
                        <span className="font-bold text-amber-300">Wilson</span>
                        <br/>
                        <span
                            aria-live="polite"
                            aria-label="Dynamic roles like developer, designer..."
                            className="inline-block min-h-[1.25em]"
                        >
                            <AnimatedText/>
                        </span>
                    </h1>

                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
                        <motion.button
                            aria-label="Navigate to Professional section"
                            onClick={() => onNavigateAction("portfolio")}
                            className="w-full sm:w-auto min-w-[175px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/20 hover:bg-amber-200 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300"
                            type="button"
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.97}}
                        >
                            <Briefcase className="w-4 h-4"/>
                            <span>Professional</span>
                        </motion.button>

                        <motion.button
                            aria-label="Navigate to Personal section"
                            onClick={() => onNavigateAction("personal")}
                            className="w-full sm:w-auto min-w-[175px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-300"
                            type="button"
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.97}}
                        >
                            <Sparkles className="w-4 h-4 text-pink-300"/>
                            <span>Personal</span>
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, scale: 0.92}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{type: "spring", stiffness: 60, damping: 14}}
                    className="relative flex-shrink-0 flex justify-center"
                >
                    <div className="absolute inset-0 scale-110 bg-cyan-400/25 blur-3xl rounded-full pointer-events-none"/>
                    <Image
                        src="/profile-hi.png"
                        alt="Wilson Guevara avatar"
                        width={280}
                        height={432}
                        priority
                        className="relative w-[170px] sm:w-[210px] md:w-[250px] h-auto object-contain drop-shadow-2xl"
                    />
                </motion.div>
            </section>

            <motion.p
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.25, duration: 0.5}}
                className="text-center text-white/85 text-sm sm:text-base md:text-lg font-medium tracking-wide z-10"
            >
                I build elegant software that solves real problems — fast.
            </motion.p>
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
                        .typeString("I <b class='text-amber-300 font-semibold'>design</b>")
                        .pauseFor(1000)
                        .deleteChars(6)
                        .typeString("<b class='text-amber-300 font-semibold'>develop</b>")
                        .pauseFor(1000)
                        .deleteChars(7)
                        .typeString("<b class='text-amber-300 font-semibold'>test</b>")
                        .pauseFor(1000)
                        .deleteChars(4)
                        .typeString("<b class='text-amber-300 font-semibold'>deploy</b>")
                        .pauseFor(1000)
                        .deleteChars(6)
                        .changeDelay(90)
                        .typeString("<b class='text-amber-300 font-semibold'>deliver software solutions</b>")
                        .pauseFor(25000)
                        .changeDeleteSpeed(250)
                        .deleteAll()
                        .changeDelay(50)
                        .start();
                }}
            />
        </span>
    );
}
