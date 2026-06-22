"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dark_logo from "../../public/assets/dark_logo.png";

const LandingNavbarItems = [
  { link: "/", label: "Home" },
  { link: "about", label: "About" },
  { link: "features", label: "Workflow" },
  { link: "protocols", label: "Protocols" },
  { link: "faq", label: "FAQ" },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 px-4 py-2 transition-all duration-300 md:px-10 ${
        scrolled ? " bg-[#06101f]/72 backdrop-blur-2xl" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#hero"
          className="flex items-center gap-2 text-lg font-semibold tracking-tighter text-white no-underline"
        >
          <Image
            src={Dark_logo}
            alt="ChadWallet Logo"
            priority
            width={70}
            height={70}
            className="rounded-full"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {LandingNavbarItems.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              className="text-md font-medium text-slate-200 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-[0.6rem] bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-50"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="block rounded-xl border border-white/10 bg-white/5 p-2 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`block h-0.5 rounded-sm bg-white transition-all duration-300 ${
                mobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 rounded-sm bg-white transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 rounded-sm bg-white transition-all duration-300 ${
                mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="rounded-xl border border-white/10 bg-[#09111d]/95 p-5 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-4">
            {LandingNavbarItems.map((link) => (
              <Link
                key={link.link}
                href={link.link}
                className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-[0.6rem] bg-white px-5 py-3 text-center text-secondary text-sm font-medium transition-all duration-300 hover:bg-white/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>{" "}
          </div>
        </div>
      )}
    </nav>
  );
}
