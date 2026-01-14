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

const AuthHero = () => {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-[#eef3ef] via-[#f8f9f7] to-[#fdf6ec] font-body">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-sage-light/30" />

      <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-3 p-6 opacity-90 z-10">
        <div className="row-span-2 rounded-3xl overflow-hidden shadow-xl shadow-black/10 animate-fade-in">
          <img
            src={wellnessMeditation}
            alt="Meditation and yoga"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="rounded-3xl overflow-hidden shadow-medium">
          <img
            src={wellnessOils}
            alt="Essential oils"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="rounded-3xl overflow-hidden shadow-medium">
          <img
            src={wellnessAcupuncture}
            alt="Acupuncture therapy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="rounded-3xl overflow-hidden shadow-medium">
          <img
            src={wellnessHerbs}
            alt="Herbal remedies"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="rounded-3xl overflow-hidden shadow-medium">
          <img
            src={wellnessHero}
            alt="Zen spa"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9f7] via-[#f8f9f7]/90 to-transparent z-20 pointer-events-none" />

        {/* Floating Decorative Icons */}
<div className="absolute inset-0 z-25 pointer-events-none">
  <div className="absolute top-20 right-16 slow-float">
    <div className="w-12 h-12 rounded-full bg-[#cfe3dd] flex items-center justify-center">
      <Leaf className="h-6 w-6 text-[#2f5f59]" />
    </div>
  </div>

  <div className="absolute top-[38%] right-[35%] slow-float delay-200">
    <div className="w-10 h-10 rounded-full bg-[#e6efec] flex items-center justify-center">
      <Sparkles className="h-5 w-5 text-[#3f6f68]" />
    </div>
  </div>

  <div className="absolute bottom-[35%] left-[35%] slow-float delay-300">
    <div className="w-11 h-11 rounded-full bg-[#dbe9e4] flex items-center justify-center">
      <Heart className="h-5 w-5 text-[#355f5b]" />
    </div>
  </div>

  <div className="absolute bottom-[28%] right-[30%] slow-float delay-500">
    <div className="w-10 h-10 rounded-full bg-[#efe7da] flex items-center justify-center">
      <Star className="h-5 w-5 text-[#7a6b44]" />
    </div>
  </div>
</div>


      <div className="relative z-30 h-full flex flex-col justify-start pt-24 px-8 lg:px-12 max-w-lg">
        <div>
          {/* <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">Wellnexus</span>
          </div> */}
        <div className="flex items-center gap-3 mb-6">
  <div className="
    w-12 h-12
    rounded-xl
    bg-[#2f5f59]
    flex items-center justify-center
  ">
    <Leaf className="h-6 w-6 text-white" />
  </div>

  <span className="
    font-display
    text-2xl
    font-bold
    text-[#2f5f59]
  ">
    Wellnexus
  </span>
</div>

          <h1 className="font-display text-4xl lg:text-5xl font-bold text-[#355f5b] leading-tight mb-4">
            A Digital Platform for Integrated Wellness Care
          </h1>

          <p className="text-lg text-[#7f9893] mb-8">
            Connect with verified practitioners, book therapy sessions, and
            discover products for your complete wellness journey.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {therapies.map((therapy) => (
      <span
  key={therapy}
  className="
    px-3 py-1.5
    rounded-full
    border border-[#b6d0c9]
    bg-[#eef4f2]
    text-sm font-medium text-[#3f6f68]
    transition-all duration-300 ease-out
    hover:bg-[#cfe3dd]
    hover:border-[#9fc2b8]
    hover:text-[#244b45]
    cursor-pointer
  "
>
  {therapy}
</span>
            ))}
          </div>

<div className="grid grid-cols-3 gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-soft">            <div className="text-center">
              <p className="text-[28px] font-body lg:text-[32px] tracking-tight font-semibold text-[#3f6f68]">500+</p>
              <p className="mt-1 text-[11px] font-medium tracking-wide text-[#6f8f89] uppercase">Practitioners</p>
            </div>
            <div className="text-center border-white/40  border-x">
              <p className="text-[28px] font-body lg:text-[32px] tracking-tight font-semibold text-[#3f6f68]">10k+</p>
              <p className="mt-1 text-[11px] font-medium tracking-wide text-[#8fa5a0]">Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-[28px] font-body lg:text-[32px] tracking-tight font-semibold text-[#3f6f68]">4.9</p>
              <p className="mt-1 text-[11px] font-medium tracking-wide text-[#8fa5a0]">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;