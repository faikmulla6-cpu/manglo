"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Manglo's homepage adaptation of the Hero 2.1 design.
 * The surrounding static page retains its existing navigation and working
 * image-export studio, so this island deliberately doesn't duplicate them.
 */
const Hero2 = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : { opacity: 0, y: 18 };

  return (
    <div className="mg:relative mg:isolate mg:py-8 mg:sm:py-12">
      <div
        aria-hidden="true"
        className="mg:pointer-events-none mg:absolute mg:-top-24 mg:-left-20 mg:-z-10 mg:h-72 mg:w-72 mg:rounded-full mg:bg-orange-600/15 mg:blur-3xl"
      />

      <motion.a
        initial={entrance}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
        href="#tools"
        className="manglo-hero-badge mg:mb-8 mg:inline-flex mg:max-w-full mg:items-center mg:gap-2 mg:rounded-full mg:border mg:border-white/15 mg:bg-white/5 mg:px-4 mg:py-2 mg:text-xs mg:font-semibold mg:tracking-wide mg:text-orange-100 mg:backdrop-blur-sm mg:transition-colors mg:hover:bg-white/10"
      >
        <Sparkles size={15} aria-hidden="true" />
        <span>MANGLO / THE INDEPENDENT WORKSPACE</span>
        <ArrowRight size={15} aria-hidden="true" />
      </motion.a>

      <motion.h1
        id="mg-home-title"
        initial={entrance}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06 }}
        className="mg:mb-6 mg:max-w-3xl mg:text-5xl mg:leading-[1.08] mg:font-semibold mg:tracking-tight mg:text-white mg:sm:text-6xl mg:lg:text-7xl"
      >
        A sharper edge.<br />
        <span className="mg:bg-linear-to-r mg:from-[#ffad83] mg:via-[#ff784f] mg:to-[#ffd1a5] mg:bg-clip-text mg:text-transparent">
          For every idea.
        </span>
      </motion.h1>

      <motion.p
        initial={entrance}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="mg:mb-8 mg:max-w-xl mg:text-base mg:leading-relaxed mg:text-slate-300 mg:sm:text-lg"
      >
        Make your images look their best. Understand the numbers behind every
        sale. Move from idea to listing with less friction.
      </motion.p>

      <motion.div
        initial={entrance}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="mg:flex mg:flex-col mg:items-start mg:gap-3 mg:sm:flex-row mg:sm:items-center"
      >
        <a
          href="#tools"
          className="manglo-hero-primary mg:inline-flex mg:min-h-12 mg:items-center mg:justify-center mg:gap-3 mg:rounded-full mg:bg-[#ff784f] mg:px-7 mg:py-3 mg:text-sm mg:font-semibold mg:text-[#161514] mg:shadow-lg mg:shadow-orange-950/30 mg:transition-colors mg:hover:bg-[#ff9b77] mg:focus-visible:outline-2 mg:focus-visible:outline-offset-4 mg:focus-visible:outline-orange-400"
        >
          Explore the toolkit <ArrowRight size={17} aria-hidden="true" />
        </a>
        <a
          href="/playbook/"
          className="manglo-hero-secondary mg:inline-flex mg:min-h-12 mg:items-center mg:justify-center mg:gap-3 mg:rounded-full mg:border mg:border-white/25 mg:bg-white/5 mg:px-7 mg:py-3 mg:text-sm mg:font-semibold mg:text-white mg:transition-colors mg:hover:bg-white/10 mg:focus-visible:outline-2 mg:focus-visible:outline-offset-4 mg:focus-visible:outline-orange-400"
        >
          Read the Playbook <ArrowRight size={17} aria-hidden="true" />
        </a>
      </motion.div>

      <div className="mg:mt-8 mg:flex mg:flex-wrap mg:gap-x-5 mg:gap-y-2 mg:text-xs mg:text-slate-400">
        {(["07 browser-based tools", "No sign-up", "Image processing stays local"] as const).map((item) => (
          <span key={item} className="mg:inline-flex mg:items-center mg:gap-2">
            <Check size={14} className="mg:text-orange-300" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>

      <button
        type="button"
        aria-expanded={showHowItWorks}
        aria-controls="manglo-how-it-works"
        onClick={() => setShowHowItWorks((open) => !open)}
        className="manglo-hero-how mg:mt-7 mg:inline-flex mg:items-center mg:gap-2 mg:rounded-full mg:py-2 mg:px-4 mg:text-xs mg:font-medium mg:text-slate-300 mg:underline-offset-4 mg:hover:text-white"
      >
        How does Manglo work?
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`mg:transition-transform ${showHowItWorks ? "mg:rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {showHowItWorks && (
          <motion.div
            id="manglo-how-it-works"
            key="steps"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
            className="mg:overflow-hidden"
          >
            <ol className="mg:mt-3 mg:grid mg:gap-2 mg:rounded-2xl mg:border mg:border-white/10 mg:bg-white/5 mg:p-4 mg:text-sm mg:leading-relaxed mg:text-slate-300">
              <li>1. Pick an image tool or calculator.</li>
              <li>2. Adjust your options and preview the result.</li>
              <li>3. Download your file or copy the calculation.</li>
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Hero2 };
