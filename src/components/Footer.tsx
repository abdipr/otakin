import { useRef } from "react";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.6,
          ease: "back.out(1.2)",
        },
      );
    },
    { scope: footerRef },
  );

  const socialLinks = [
    {
      id: "twitter",
      icon: <FaXTwitter size={18} />,
      url: "https://x.com/abdiprr",
      label: "X",
    },
    {
      id: "discord",
      icon: <FaDiscord size={18} />,
      url: "https://discord.gg/EsBAtszGKQ",
      label: "Discord",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="w-full mt-auto py-8 border-t border-neutral-200/50 dark:border-neutral-900/60 bg-transparent opacity-0"
      id="main-footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm">
        {/* Left Side: Copyright */}
        <div className="flex items-center space-x-2 select-none">
          <span
            className="font-medium text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400 transition-colors"
            id="copyright-text"
          >
            © 2026 otak.in. All rights reserved.
          </span>
          <span className="text-neutral-300 dark:text-neutral-800">|</span>
          <span className="text-[10px] font-mono text-neutral-450 dark:text-neutral-600 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/50 rounded-md px-2 py-0.5">
            Pre-Launch
          </span>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="flex items-center space-x-5">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-brand-orange dark:text-neutral-500 dark:hover:text-brand-orange transition-all duration-300 transform hover:-translate-y-0.5"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
