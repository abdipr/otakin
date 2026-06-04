/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Theme, Registration } from "./types";
import { getCookie, setCookie } from "./utils";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WaitingListCard from "./components/WaitingListCard";
import Footer from "./components/Footer";
import { Button } from "./components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function App() {
  // Theme state: defaults to device setting, stored in cookie
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedCookie = getCookie("otakin_theme");
      if (savedCookie === "dark" || savedCookie === "light") {
        return savedCookie;
      }
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      return systemPrefersDark ? "dark" : "light";
    }
    return "dark";
  });

  // Database drawer state
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply theme to HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    setCookie("otakin_theme", theme);
  }, [theme]);

  useGSAP(
    () => {
      // Subtle float animation for ambient glowing blobs using GSAP
      gsap.to(".ambient-blob-1", {
        y: -25,
        x: 15,
        scale: 1.03,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".ambient-blob-2", {
        y: 20,
        x: -15,
        scale: 0.97,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-dvh flex flex-col transition-colors duration-500 ease-out dark:bg-[#070707] bg-[#fafafa]"
      id="app-root-container"
    >
      {/* Ambient background visual effects & glow blobs */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        id="bg-visual-effects"
      >
        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.6] grid-mesh" />

        {/* Blob 1: Orange glow (Left side) */}
        <div
          className="ambient-blob-1 absolute -left-20 top-1/4 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] rounded-full opacity-70 transform-gpu"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 147, 118, 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Blob 2: Rose glow (Right side) */}
        <div
          className="ambient-blob-2 absolute -right-20 top-1/3 h-[380px] w-[380px] sm:h-[520px] sm:w-[520px] rounded-full opacity-70 transform-gpu"
          style={{
            background:
              "radial-gradient(circle, rgba(216, 88, 100, 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top central ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[150px] w-[70vw] rounded-b-full transform-gpu"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(255, 147, 118, 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Navbar Container */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Content */}
      <main
        className="relative z-10 grow flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 md:pt-16"
        id="main-content"
      >
        <div className="py-6 md:py-0 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-12 items-center w-full">
          <div className="md:col-span-7 w-full">
            <Hero />
          </div>
          <div className="md:col-span-5 w-full">
            <WaitingListCard />
          </div>
        </div>
      </main>

      {/* Social Footer */}
      <Footer />
    </div>
  );
}
