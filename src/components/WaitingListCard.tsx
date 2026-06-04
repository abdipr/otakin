import React, { useState, useEffect, useRef } from "react";
import { FaDiscord } from "react-icons/fa6";
import {
  Mail,
  CheckCircle2,
  Users,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { savePantryRegistration, getPantryRegistrations } from "../utils";
import { Registration } from "../types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function WaitingListCard() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<Registration | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [totalWaiting, setTotalWaiting] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Initial card entrance
      if (!successData && !isDuplicate) {
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "elastic.out(1, 0.7)",
        });
      }

      // Success screen entrance with staggered children
      if (successData || isDuplicate) {
        gsap.fromTo(
          ".success-screen-animate",
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.2)",
          },
        );

        gsap.fromTo(
          ".success-child-animate",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.5)",
            delay: 0.1,
          },
        );
      }
    },
    { scope: cardRef, dependencies: [successData, isDuplicate] },
  );

  useEffect(() => {
    getPantryRegistrations().then((list) => {
      setTotalWaiting(list.length);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsDuplicate(false);

    if (!email.trim()) {
      setErrorMsg("Harap masukkan alamat email kamu.");
      return;
    }

    setLoading(true);

    const result = await savePantryRegistration(email);
    setLoading(false);

    if (result.success && result.data) {
      setSuccessData(result.data);
      setIsDuplicate(false);
      setTotalWaiting((prev) => prev + 1);
      setEmail("");
    } else {
      if (result.error && result.error.includes("sudah terdaftar")) {
        setIsDuplicate(true);
        setSuccessData(result.data || null);
      } else {
        setErrorMsg(result.error || "Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setIsDuplicate(false);
    setErrorMsg(null);
  };

  return (
    <div
      ref={cardRef}
      className="relative mx-auto md:mr-0 md:ml-auto w-full max-w-lg px-4 opacity-0 translate-y-[30px]"
      id="waiting-list-section"
    >
      {/* Decorative glow shadow */}
      <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-brand-orange-light via-brand-orange to-brand-rose opacity-15 blur-xl transition duration-1000" />

      <div
        className="relative overflow-hidden rounded-2xl glass-panel p-5 sm:p-6"
        id="waiting-list-container-card"
      >
        {/* Total waiting count pill */}
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center space-x-1.5 rounded-full px-3 py-1 text-[11px] font-semibold bg-neutral-100/80 text-neutral-700 border border-neutral-200/60 dark:bg-neutral-800/60 dark:text-neutral-300 dark:border-neutral-700/50">
            <Users className="h-3 w-3 text-brand-orange" />
            <span>
              {totalWaiting.toLocaleString("id-ID")} Siswa dalam Antrean
            </span>
          </div>
        </div>

        {!successData && !isDuplicate ? (
          <div>
            <div className="text-center">
              <h3
                className="font-sans text-base sm:text-lg font-bold tracking-tight dark:text-neutral-50 text-neutral-900"
                id="card-title"
              >
                Jadilah yang Pertama Mencoba
              </h3>
              <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed dark:text-neutral-400 text-neutral-500 px-2">
                Masukkan email kamu untuk bergabung ke waiting list dan dapatkan
                info rilis eksklusif.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div className="relative rounded-xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 dark:text-neutral-500 text-neutral-400" />
                </div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  disabled={loading}
                  className="pl-9 h-10 text-sm"
                  autoComplete="email"
                  required
                />
              </div>

              {errorMsg && (
                <div className="flex items-center space-x-2 text-red-500 dark:text-red-400 text-[11px] pl-1">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={loading}
                  variant="brand"
                  size="default"
                  className="w-full flex items-center justify-center space-x-2"
                  id="submit-register-btn"
                >
                  {loading ? (
                    <span className="flex items-center space-x-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Memproses...</span>
                    </span>
                  ) : (
                    <>
                      <span>Gabung Waiting List</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="success-screen-animate text-center py-2">
            <div className="flex justify-center success-child-animate">
              <div className="relative inline-flex items-center justify-center">
                <span className="absolute inset-0 h-full w-full rounded-full bg-brand-orange animate-ping opacity-30" />
                <CheckCircle2 className="relative h-10 w-10 text-brand-orange" />
              </div>
            </div>

            <h3
              className="mt-3 font-sans text-base sm:text-lg font-bold tracking-tight dark:text-neutral-50 text-neutral-900 success-child-animate"
              id="success-title"
            >
              {isDuplicate ? "Email Sudah Terdaftar!" : "Pendaftaran Berhasil!"}
            </h3>

            <div className="mt-3 p-3 rounded-xl dark:bg-neutral-900/60 bg-neutral-50/80 border dark:border-neutral-800 border-neutral-200 inline-block max-w-full success-child-animate">
              <p className="text-[9px] sm:text-[10px] dark:text-neutral-500 text-neutral-400 font-semibold tracking-wider uppercase">
                Nomor Antrean kamu
              </p>
              <p className="text-2xl font-extrabold bg-linear-to-r from-brand-orange-light via-brand-orange to-brand-rose bg-clip-text text-transparent font-sans mt-0.5">
                #{successData?.id ?? "0"}
              </p>
              <p className="text-[10px] sm:text-[11px] dark:text-neutral-400 text-neutral-500 mt-1.5 break-all">
                Mendaftar sebagai:{" "}
                <strong className="dark:text-neutral-200 text-neutral-700">
                  {successData?.email}
                </strong>
              </p>
            </div>

            <p className="mt-3 text-[11px] sm:text-xs leading-relaxed dark:text-neutral-400 text-neutral-500 px-2 success-child-animate">
              {isDuplicate
                ? "Alamat email ini udah terdaftar. Kami bakal ngasih kabar langsung pas otak.in rilis!"
                : "Terima kasih udah gabung! Kamu masuk prioritas waiting list pre-launch."}
            </p>

            <div className="mt-4 flex flex-col sm:flex-row space-y-2.5 sm:space-y-0 sm:space-x-2.5 justify-center success-child-animate">
              <a
                href="https://discord.gg/EsBAtszGKQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="default"
                  className="w-full flex items-center justify-center space-x-2 bg-[#5865F2]! hover:bg-[#4752C4]! text-white! shadow-[0_4px_0_0_#3942a0]! active:shadow-[0_0px_0_0_#3942a0]!"
                  id="success-discord-btn"
                >
                  <FaDiscord size={16} />
                  <span>Join Discord Komunitas</span>
                </Button>
              </a>

              <Button
                onClick={handleReset}
                variant="outline"
                size="default"
                className="w-full"
                id="back-add-email-btn"
              >
                <span>Daftarin Email Lain</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
