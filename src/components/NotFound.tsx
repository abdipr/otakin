import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getCookie } from "../utils";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCookie = getCookie("otakin_theme");
      let isDark = false;
      if (savedCookie === "dark") {
        isDark = true;
      } else if (savedCookie === "light") {
        isDark = false;
      } else {
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      const root = window.document.documentElement;
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, []);

  useGSAP(
    () => {
      gsap.from(".notfound-animate", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.5)",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#070707] text-neutral-900 dark:text-neutral-100 px-6 relative overflow-hidden"
    >
      {/* Background blobs matching the brand */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 dark:bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="text-center space-y-6 z-10">
        <h1 className="notfound-animate font-modak text-[10rem] md:text-[14rem] leading-none bg-linear-to-b from-brand-orange-light via-brand-orange to-brand-rose bg-clip-text text-transparent pb-4 -mb-4 select-none">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="notfound-animate text-2xl md:text-3xl font-bold">
            Halaman Tidak Ditemukan
          </h2>
          <p className="notfound-animate text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            Waduh! Sepertinya kamu tersesat. Halaman yang kamu cari tidak ada
            atau sudah dipindahkan.
          </p>
        </div>
        <div className="notfound-animate pt-4">
          <Link to="/">
            <Button variant="brand" size="lg">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
