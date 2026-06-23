import Image from "next/image";
import Link from "next/link";
import Applestore from "../../public/assets/applestore.png";
import Googleplay from "../../public/assets/goggleplay.png";
import DarkLogo from "../../public/assets/dark_logo.png";
import { FOOTER_DATA } from "@/config/landing";



const LandingFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand Section */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={DarkLogo}
                alt="ChadWallet Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h2 className="text-2xl font-bold text-white">ChadWallet</h2>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              {FOOTER_DATA.brandDescription}
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-12 lg:grid-cols-4 sm:gap-20">
            {FOOTER_DATA.sections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-md font-semibold ">{section.title}</h3>

                <ul className="space-y-1">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noreferrer"
                            : undefined
                        }
                        className="text-sm text-slate-400 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Mobile Apps Section */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                Get the App
              </h3>
              <div className="flex flex-col gap-3">
                <Link
                  href="{FOOTER_DATA.appStoreLink}"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={Applestore}
                    alt="App Store"
                    width={498}
                    height={167}
                    className="w-[140px] md:w-[150px] h-auto transition-opacity hover:opacity-80"
                  />
                </Link>
                <Link
                  href="{FOOTER_DATA.googlePlayLink}"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={Googleplay}
                    alt="Google Play"
                    width={646}
                    height={250}
                    className="w-[165px] md:w-[175px] h-auto -ml-3 transition-opacity hover:opacity-80"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-sm text-slate-500 md:flex-row md:text-left">
          <p>{FOOTER_DATA.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
