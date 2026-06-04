import { useRef } from "react";
import { FaDiscord } from "react-icons/fa6";
import { Sun, Moon } from "lucide-react";
import { Theme } from "../types";
import { Button } from "./ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.8)",
      });
    },
    { scope: navRef },
  );

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 w-full border-b border-neutral-200/50 bg-white/40 backdrop-blur-sm dark:border-neutral-900/60 dark:bg-[#0d0d0d]/40 translate-y-[-20px] opacity-0"
      id="main-navbar"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          id="navbar-logo-container"
        >
          <span
            className="font-modak text-3xl tracking-wider select-none bg-linear-to-b from-brand-orange-light via-brand-orange to-brand-rose bg-clip-text text-transparent"
            id="navbar-logo"
          >
            otak.in
          </span>
        </div>

        {/* Right Side: Toggle & Discord Button */}
        <div className="flex items-center space-x-3">
          {/* Discord Button - Direct Link */}
          <a
            href="https://discord.gg/EsBAtszGKQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="default"
              className="h-10 px-4 flex items-center space-x-2 bg-[#5865F2]! hover:bg-[#4752C4]! text-white! shadow-[0_4px_0_0_#3942a0]! active:shadow-[0_0px_0_0_#3942a0]!"
              id="discord-nav-btn"
            >
              <FaDiscord size={16} />
              <span className="hidden sm:inline">Join Discord</span>
              <span className="inline sm:hidden">Join</span>
            </Button>
          </a>
          {/* Theme Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            id="theme-toggle-btn"
            className="w-10 h-10"
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px] text-brand-orange-light transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-[18px] w-[18px] text-neutral-600 dark:text-neutral-300 transition-transform duration-300 hover:-rotate-12" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
