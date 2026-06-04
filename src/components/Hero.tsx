import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.5)" } });

      tl.to(".hero-badge", {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.6)",
        delay: 0.2,
      })
        .to(
          ".hero-title-line",
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          "-=0.9",
        )
        .to(
          ".hero-desc",
          { opacity: 1, y: 0, duration: 1.2, ease: "back.out(1.2)" },
          "-=1",
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center text-center md:items-start md:text-left px-4 pt-0 md:pt-2 pb-0 md:px-0 overflow-hidden"
      id="hero-heading-section"
    >
      {/* Premium Badge: Coming Soon */}
      <div
        className="hero-badge opacity-0 scale-90 mb-3 md:mb-4 inline-flex items-center space-x-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wide uppercase glass-panel dark:text-neutral-300 text-neutral-700 shadow-xs"
        id="badge-coming-soon"
      >
        <span className="inline-block animate-pulse text-brand-orange">✦</span>
        <span className="font-sans">PRE-LAUNCH • COMING SOON</span>
      </div>

      {/* Hero Heading */}
      <h1
        className="font-modak text-4xl md:text-5xl lg:text-6xl tracking-normal leading-[1.1] max-w-3xl select-none"
        id="hero-header-h1"
      >
        <span className="hero-title-line block opacity-0 translate-y-8 bg-linear-to-r dark:from-white dark:via-neutral-100 dark:to-neutral-300 from-[#1a1918] via-[#332f2b] to-[#4c3e34] bg-clip-text text-transparent">
          Belajar Cerdas
        </span>
        <span className="hero-title-line block opacity-0 translate-y-8 bg-linear-to-r from-brand-orange-light via-brand-orange to-brand-rose bg-clip-text text-transparent">
          untuk UTBK.
        </span>
      </h1>

      {/* Hero Description */}
      <div className="hero-desc opacity-0 translate-y-6 mt-3 md:mt-4 w-full flex justify-center md:justify-start">
        <p
          className="max-w-[420px] font-sans text-sm md:text-sm leading-relaxed dark:text-neutral-400 text-neutral-500 px-4 md:px-0 text-center md:text-left"
          id="hero-description-p"
        >
          Dibangun bersama calon pejuang UTBK. Bergabunglah lebih awal, berikan
          masukan, dan lihat bagaimana{" "}
          <span className="font-semibold bg-linear-to-r from-brand-orange to-brand-rose bg-clip-text text-transparent">
            otak.in
          </span>{" "}
          berkembang secara transparan.
        </p>
      </div>
    </div>
  );
}
