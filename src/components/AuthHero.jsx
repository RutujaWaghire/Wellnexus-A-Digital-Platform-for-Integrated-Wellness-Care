import { motion } from "framer-motion";
import { Leaf, Sparkles, Heart, Star } from "lucide-react";

import wellnessHero from "../assets/wellness-hero.jpg";
import wellnessMeditation from "../assets/wellness-meditation.jpg";
import wellnessOils from "../assets/wellness-oils.jpg";
import wellnessAcupuncture from "../assets/wellness-acupuncture.jpg";
import wellnessHerbs from "../assets/wellness-herbs.jpg";

const therapies = [
  "Physiotherapy",
  "Acupuncture",
  "Ayurveda",
  "Chiropractic",
  "Massage Therapy",
  "Naturopathy",
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const floating = {
  animate: {
    y: [0, -10, 0],
  },
};

export default function AuthHero() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-[#eef3ef] via-[#f8f9f7] to-[#fdf6ec]">

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2f5f59]/5 via-transparent to-[#cfe3dd]/40" />

      {/* Image collage (NO animation → performance win) */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-3 p-6 opacity-90 z-10">
        <div className="row-span-2 rounded-3xl overflow-hidden shadow-xl">
          <img src={wellnessMeditation} className="w-full h-full object-cover" />
        </div>
        {[wellnessOils, wellnessAcupuncture, wellnessHerbs, wellnessHero].map(
          (img, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden shadow-medium"
            >
              <img src={img} className="w-full h-full object-cover" />
            </div>
          )
        )}
      </div>

      {/* Left fade mask */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9f7] via-[#f8f9f7]/95 to-transparent z-20 pointer-events-none" />

      {/* Floating icons (subtle, slow, GPU-safe) */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {[
          { Icon: Leaf, top: "top-20", right: "right-16", bg: "#cfe3dd" },
          { Icon: Sparkles, top: "top-[38%]", right: "right-[35%]", bg: "#e6efec" },
          { Icon: Heart, bottom: "bottom-[35%]", left: "left-[35%]", bg: "#dbe9e4" },
          { Icon: Star, bottom: "bottom-[28%]", right: "right-[30%]", bg: "#efe7da" },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={floating}
            animate="animate"
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute ${item.top || ""} ${item.bottom || ""} ${item.left || ""} ${item.right || ""}`}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: item.bg }}
            >
              <item.Icon className="h-5 w-5 text-[#2f5f59]" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12 }}
        className="relative z-40 h-full flex flex-col justify-start pt-24 px-8 lg:px-12 max-w-lg"
      >
        {/* Logo */}
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#2f5f59] flex items-center justify-center">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-[#2f5f59]">
            Wellnexus
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl lg:text-5xl font-bold text-[#355f5b] leading-tight mb-4"
        >
          A Digital Platform for Integrated Wellness Care
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-lg text-[#7f9893] mb-8"
        >
          Connect with verified practitioners, book therapy sessions, and
          discover products for your complete wellness journey.
        </motion.p>

        {/* Therapy tags */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-2 mb-8"
        >
          {therapies.map((therapy) => (
            <span
              key={therapy}
              className="px-3 py-1.5 rounded-full border border-[#b6d0c9] bg-[#eef4f2] text-sm font-medium text-[#3f6f68] hover:bg-[#cfe3dd] transition"
            >
              {therapy}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-3 gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-soft"
        >
          {[
            { value: "500+", label: "Practitioners" },
            { value: "10k+", label: "Sessions" },
            { value: "4.9", label: "Rating" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-[30px] font-semibold text-[#3f6f68]">
                {item.value}
              </p>
              <p className="mt-1 text-[11px] font-medium tracking-wide text-[#8fa5a0] uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
